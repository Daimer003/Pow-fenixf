import { ExtractedRowData, AnalysisDataItem, IDataTable } from './interfaces/function.interfaces';
import Papa from 'papaparse';
import moment from 'moment';
import { chartData } from './chart/chart.skeleton';

const backFileColumns: string[] = ['Pass', "Result", "Profit", "Recovery Factor", "Equity DD %", 'Trades'];
const forwardFileColumns: string[] = ["Pass", "Forward Result", "Back Result", "Profit", "Recovery Factor", "Equity DD %", "Trades"];
export let backFileData: ExtractedRowData[] = [];
export let forwardFileData: ExtractedRowData[] = [];
let analysisData: any[] = []; // Assuming unknown structure
let mergedData: any[] = []; // Assuming unknown structure
let csvDataMap: { [key: string]: string } = {};
let prefixGroups: { [x: string]: any; };
const dropTimes: { date: Date; drop: number; filename: string }[] = [];
const resultDropTable: any = [];



export function clearData(): void {
  forwardFileData = [],
    backFileData = [],
    analysisData = [],
    mergedData = [];
};

type File = string | ArrayBuffer | null | undefined;

export function parseXml(xmlString: File): Document {
  return new DOMParser().parseFromString(xmlString as string, 'application/xml');
};

export function extractData(
  tableData: Document, // Elemento HTML que contiene los datos de la tabla
  headers: string[], // Array de nombres de cabeceras
  prefix: string, // Prefijo para los nombres de los campos
  optimisationName: string // Nombre de la optimización
): any[] {
  const extractedData: any[] = [];
  const rows = tableData.querySelectorAll("Row");
  const headerCells = rows[0].querySelectorAll("Cell");
  const headerIndices = headers.map((header) => Array.from(headerCells).findIndex((cell) => cell.textContent === header));

  let invalidCounter = 0;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowData: any = {
      "Optimisation Name": optimisationName,
    };

    for (let j = 0; j < headerIndices.length; j++) {
      const header = headers[j];
      const cell = row.querySelectorAll("Cell")[headerIndices[j]];
      const dataElement = cell?.querySelector("Data");

      let value = "";
      if (dataElement) {
        value = dataElement.textContent ? dataElement.textContent : "";

        if (header === "Pass") {
          const parsedValue = parseFloat(value);
          if (isNaN(parsedValue) || parsedValue < 1) {
            invalidCounter++;
          } else {
            value = optimisationName + '_' + value;
          }
        }
      }

      rowData[prefix + " " + header] = value;
    }

    extractedData.push(rowData);
  }

  if (invalidCounter >= 2) {
    const noDataMessageElement = document.getElementById("noDataMessage");
    if (noDataMessageElement) {
      noDataMessageElement.style.display = "block"; // Mostrar el mensaje de error
      noDataMessageElement.innerHTML += `
          <i class="fas fa-exclamation-triangle"></i> ${optimisationName} has ${invalidCounter} missing Pass numbers - try re-exporting from MT5 (you can still upload the rest of the data by clicking UPLOAD) - see <a href="https://myaccount-pow.com/portfolio-guide#errors" target="_blank" style="cursor:anyer;color:white;text-decoration:underline;"> Help Guide section 6 <i class="fas fa-external-link-alt"></i></a><br>
        `;
    }
  }

  return extractedData;
};

function calculateCustomScore(data: any, startDate: number, endDate: number, forwardDate: number) {
  const backProfit = parseFloat(data["Back Profit"]);
  const forwardProfit = parseFloat(data["Forward Profit"]);
  const backRecoveryFactor = parseFloat(data["Back Recovery Factor"]);
  const forwardRecoveryFactor = parseFloat(data["Forward Recovery Factor"]);
  const backTrades = parseInt(data["Back Trades"]);
  const forwardTrades = parseInt(data["Forward Trades"]);
  const totalProfit = Number((backProfit + forwardProfit).toFixed(2));
  const maxRecoveryFactor = Number(Math.max(backProfit / backRecoveryFactor, forwardProfit / forwardRecoveryFactor).toFixed(2));
  const profitToRecoveryFactor = totalProfit / maxRecoveryFactor;
  const backProfitToBackRecoveryFactor = backProfit / backRecoveryFactor;
  const forwardProfitToForwardRecoveryFactor = forwardProfit / forwardRecoveryFactor;
  const endDateOnDays = endDate / 86400000;
  const startDateOnDays = startDate / 86400000;
  const logProfitToRecoveryFactor = 100 * (Math.log(profitToRecoveryFactor) / Math.log(4));
  if (backRecoveryFactor <= 1 && forwardRecoveryFactor <= 1 || backTrades + forwardTrades < (endDateOnDays - startDateOnDays) / 5) {
    return 0;
  }
  const progressionFactor = (forwardDate - startDate) / (endDate - forwardDate);
  const tradeQuality = 100 * (1 - Math.abs(1 - forwardProfit / (backProfit / progressionFactor)));
  const tradeConsistency = 100 * (1 - Math.abs(1 - forwardTrades / (backTrades / progressionFactor)));
  const tradeFlexibility = 100 * (1 - Math.abs((forwardProfitToForwardRecoveryFactor - backProfitToBackRecoveryFactor) / (forwardProfitToForwardRecoveryFactor + backProfitToBackRecoveryFactor)));
  const customScore = tradeQuality * 0.25 + logProfitToRecoveryFactor * 0.5 + tradeFlexibility * 0.15 + tradeConsistency * 0.1;
  return customScore;
}

export const calculatePercentage = (forwardDate: Date, startDate: Date, endDate: Date) => {
  const timeDifference = endDate.getTime() - startDate.getTime();
  const forwardDifference = forwardDate.getTime() - startDate.getTime();

  const percentage = (forwardDifference / timeDifference) * 100;

  return percentage;
};

export const CalculateTableInfo = (forwardDate: Date, endDate: Date, startDate: Date) => {
  const mergedData = backFileData.map((backData: { [x: string]: any; }) => {
    const forwardData = forwardFileData.find((f: { [x: string]: any; }) => f["Forward Pass"] === backData["Back Pass"]);
    if (!forwardData) {
      return null;
    }

    const mergedItem: AnalysisDataItem = {
      ...backData,
      ...forwardData,
      "Back Pass": backData["Back Pass"].replace(backData["Optimisation Name"] + '_', ''),
      "Forward Pass": forwardData["Forward Pass"].replace(backData["Optimisation Name"] + '_', ''),
      "ProfitMatch%": (
        (Number(forwardData["Forward Profit"]) / (Number(backData["Back Profit"]) / calculatePercentage(forwardDate, startDate, endDate)) * 100)
      ).toFixed(2),
    };

    const customScore = calculateCustomScore(mergedItem, startDate.getTime(), endDate.getTime(), forwardDate.getTime());
    if (customScore) {
      mergedItem["POW Score"] = customScore.toFixed(2);
    }

    return mergedItem;
  }).filter((item): item is AnalysisDataItem => item !== null);

  return mergedData;
}

/* 
  Esta funcion va inmediatamente despues de @getDateFromDocument, 
  para determinar que informacion tienen los archivos

  Esta funcion llama a extractData.
*/
export const HandleFlies = async (files: any[]) => {
  const extensions = ['.forward', '.Forward', " Forward", " forward", ".fwd", ".Fwd", ".FORWARD", " FORWARD", " FWD", ".FWD", " fwd", " Fwd", "-fwd", "-Fwd", "-FWD", "-Forward", "-forward", "-FORWARD", "_fwd", '_Fwd', "_FWD", "_forward", "_Forward", '_FORWARD'];
  const prefixType: { prefix: any; type: string; }[] = [];
  const promises = Array.from(files).map((file: any) => new Promise<void>(res => {
    const fileReader = new FileReader();
    fileReader.onload = function (fileOnLoad) {
      let data;
      const parsedFile = parseXml(fileOnLoad.target?.result);
      let name = file.name.split(".xml")[0];
      for (let i = 0; i < extensions.length; i++) {
        name = name.split(extensions[i])[0];
      }
      if (extensions.some(ext => file.name.endsWith(ext + '.xml'))) {
        data = extractData(parsedFile, forwardFileColumns, 'Forward', name);
        forwardFileData = [...forwardFileData, ...data]
        prefixType.push({
          'prefix': name,
          'type': 'forward',
        })
      } else {
        data = extractData(parsedFile, backFileColumns, 'Back', name);
        backFileData = [...backFileData, ...data]
        prefixType.push({
          'prefix': name,
          'type': 'back',
        })
      }
      res();
    }
    fileReader.readAsText(file);
  }));

  await Promise.all(promises).then(() => {
    prefixGroups = {}
    prefixType.forEach(pt => {
      if (!prefixGroups[pt.prefix]) {
        prefixGroups[pt.prefix] = {
          "back": false,
          "forward": false,
        }
      }
      prefixGroups[pt.prefix][pt.type] = true;
    });
    // console.log(backFileData)
    // console.log(forwardFileData)
    // console.log(prefixGroups)
  })
}

/* 
  Esta funcion sirve para devolver la StartDate y El EndDate de la tabla Set Finder.
  en la pestaña Portafolio finder.
 */
export const getDateFromDocument = async (files: any[]) => {
  let startDate = "";
  let endDate = "";

  if (files.length > 0) {
    const promises = Array.from(files).map((file: any) => {
      return new Promise<void>((resolve) => {
        const fileReader = new FileReader();
        fileReader.onload = (event: ProgressEvent<FileReader>) => {
          const domParser = new DOMParser();
          const xmlDoc = domParser.parseFromString(event.target?.result as string, 'text/xml');
          const titleElements = xmlDoc.getElementsByTagName('Title');

          for (let i = 0; i < titleElements.length; i++) {
            const dateMatch = titleElements[i].textContent?.match(/\b\d{4}\.\d{2}\.\d{2}\b/g);
            if (dateMatch && dateMatch.length >= 2) {
              startDate = dateMatch[0].replace(/\./g, '-');
              endDate = dateMatch[1].replace(/\./g, '-');
              resolve();
              break;
            }
          }
        };
        fileReader.readAsText(file);
      });
    });

    await Promise.all(promises);
    return { startDate, endDate }
  } else {
    throw Error("Esta funcion necesita archivos");
  }
}

export const updateTable = (
  start: Date,
  end: Date,
  forward: Date,
  targetDD: number,
  profitMatchLower: number = 0,
  profitMatchUpper: number = 999,
  backRecoveryFactor: number = 0.01,
  forwardRecoveryFactor: number = 0.01,
  backResult: number = 0,
  forwardResult: number = 0
) => {

  // Measure the start time of the function
  const startTime = performance.now();
  console.log("@@@@@@@@@@@ CALCULATING DATA OF THE TABLE @@@@@@@@@@@@@@@")

  const FullObjects = backFileData.map(bdata => {
    const name = bdata["Optimisation Name"];

    const dataPass = forwardFileData.find(fdata => fdata["Forward Pass"] === bdata["Back Pass"]);
    if (!dataPass)
      return {} as ExtractedRowData;

    const fullObject = Object.assign({}, bdata, dataPass);
    fullObject["Back Pass"] = fullObject["Back Pass"]?.replace(name + '_', '');
    fullObject["Forward Pass"] = fullObject["Forward Pass"].replace(name + '_', '');

    const backProfit = Number(bdata["Back Profit"]);
    const forwardProfit = Number(dataPass["Forward Profit"]);

    const diferenceDate = (forward.getTime() - start.getTime()) / (end.getTime() - forward.getTime());

    fullObject["ProfitMatch%"] = (forwardProfit / (backProfit / diferenceDate) * 100).toFixed(2);
    return fullObject;
  });

  const FullObjectsFiltered = FullObjects.filter(element => element);
  FullObjectsFiltered.forEach(() => { });

  const remapOfFOF = FullObjectsFiltered.map(fullObject => {
    const backProfit = Number(fullObject["Back Profit"]);
    const forwardProfit = Number(fullObject["Forward Profit"]);
    const backRecoveryFactor = parseFloat(fullObject["Back Recovery Factor"]);
    const forwardRecoveryFactor = parseFloat(fullObject["Forward Recovery Factor"]);
    const score = targetDD / Math.max(backProfit / backRecoveryFactor, forwardProfit / forwardRecoveryFactor);
    //console.log(targetDD / Math.max(backProfit / backRecoveryFactor, forwardProfit / forwardRecoveryFactor));
    // console.log("targetDD - ",targetDD)
    // console.log("score - ",score);

    fullObject["Total Original Profit"] = (backProfit + forwardProfit).toFixed(2);
    fullObject["Max original DD"] = Math.max(backProfit / backRecoveryFactor, forwardProfit / forwardRecoveryFactor).toFixed(2);
    const TOP_MODD = Number(fullObject["Total Original Profit"]) / Number(fullObject["Max original DD"]);
    fullObject["Lot Multiplier_"] = score;
    fullObject["Lot Multiplier"] = Number(score.toFixed(2));
    fullObject["Total Estimated Profit"] = ((backProfit + forwardProfit) * score).toFixed(0x2);
    fullObject["Max Estimated DD"] = (Number(fullObject["Total Estimated Profit"]) / TOP_MODD).toFixed(0x2);

    //console.log(fullObject["Lot Multiplier_"]);

    const CCS = calculateCustomScore(fullObject, start.getTime(), end.getTime(), forward.getTime())
    if (CCS !== null) {
      fullObject["POW Score"] = CCS.toFixed(0x2);
    }
    return fullObject;
  }).filter(fullObject => {
    return parseFloat(fullObject["ProfitMatch%"]) >= profitMatchLower &&
      parseFloat(fullObject['ProfitMatch%']) <= profitMatchUpper &&
      parseFloat(fullObject["Back Recovery Factor"]) >= backRecoveryFactor &&
      parseFloat(fullObject["Forward Recovery Factor"]) >= forwardRecoveryFactor &&
      parseFloat(fullObject["Forward Back Result"]) >= backResult &&
      parseFloat(fullObject["Forward Forward Result"]) >= forwardResult;
  });
  const sortedTableByPOW = remapOfFOF.sort((a, b) =>
    b["POW Score"] - a["POW Score"]
  )
  // Measure the end time of the function
  const endTime = performance.now();
  console.log(`"@@@@@@@@@@@ Function took ${endTime - startTime} milliseconds to complete.  @@@@@@@@@@@@@@@`)
  return {
    headers: Object.keys(sortedTableByPOW[0]),
    data: sortedTableByPOW as IDataTable[],
  }
}

export const extractParamNames = (codeSnippet: string) => {
  const regexResult = codeSnippet.matchAll(/(\w+)=\S+\|\|/g);
  const paramNames = Array.from(regexResult, match => match[1]);
  return paramNames;
};

/* const filterInput = document.getElementById('filter');
const filterInput2 = document.getElementById('filter2');
const resultsLinks = document.getElementById('results').getElementsByTagName('a');
 */

/* filterResults(filterInput.value, filterInput2.value, [...resultsLinks]); */

export function filterResults(filterValue: string, filterValue2: string, resultsElements: HTMLCollection) {
  const includedParameterValues = filterValue.toLowerCase().split(',').map(value => value.trim());
  const filteredValue2 = filterValue2.toLowerCase();

  for (let i = 0; i < resultsElements.length; i++) {
    const element = resultsElements[i];
    const textContent = element.textContent && element.textContent.toLowerCase();
    const splitTextContent = textContent?.split('_');
    splitTextContent?.pop();
    const joinedTextContent = splitTextContent?.join('_').toLowerCase();
    const includesParameter = includedParameterValues.some(param => textContent?.includes(`_${param}.set`));
    const includesFilteredValue2 = joinedTextContent?.includes(filteredValue2);

    if ((filterValue === '' || includesParameter) && (filteredValue2 === '' || includesFilteredValue2)) {
      //@ts-ignore
      element.style.display = 'block';
    } else {
      //@ts-ignore
      element.style.display = "none";
    }
  }
}

export function parseSetFile(input: string): { parameters: Record<string, string | "HEADER">, originalContent: Record<string, string> } {
  const lines = input.split("\n");
  let parameters: Record<string, string | "HEADER"> = {};
  let originalContent: Record<string, string> = {};

  for (const line of lines) {
    if (line.startsWith(';')) {
      parameters[line] = "HEADER";
      originalContent[line] = line;
      continue;
    }

    const [key, value] = line.split('=', 2);
    let parsedValue = value;
    if (parsedValue) {
      parsedValue = parsedValue.split('||')[0];
    }

    parameters[key] = parsedValue;
    originalContent[key] = line;
  }

  return { parameters, originalContent };
}

export function isSimilar(value1: string, value2: string, tolerance: number): boolean {
  const floatValue1 = parseFloat(value1);
  const floatValue2 = parseFloat(value2);

  if (isNaN(floatValue1) || isNaN(floatValue2)) {
    return value1.toLowerCase() === value2.toLowerCase();
  }

  const difference = Math.abs(floatValue1 - floatValue2);
  const average = (floatValue1 + floatValue2) / 2;

  return (difference / average) * 100 <= tolerance;
}


export const removeDuplicates = (data: IDataTable[]) => {
  const uniqueArray = Array.from(
    data.reduce((acc, curr) => {
      const key = `${curr["Back Trades"]}-${curr["Forward Trades"]}-${curr["Back Profit"]}-${curr["Forward Profit"]}`;
      if (!acc.has(key)) {
        acc.set(key, curr);
      }
      return acc;
    }, new Map<string, any>())
  ).map(v => v[1]);
  return uniqueArray;

}


export const searchBackPass = (search: string, data: IDataTable[]) => {
  return data.filter(row => row["Back Pass"].toLowerCase().includes(search.toLowerCase()) || row["Optimisation Name"].toLowerCase().includes(search.toLowerCase()));

}

const readXML = (file: any): Promise<Document> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(reader.result as string, "application/xml");
      resolve(xmlDoc);
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const parseWorksheetToJson = (xmlDoc: Document): any[] => {
  let tableData: string[] = [];
  let jsonData: any[] = [];
  const headerRow = xmlDoc.querySelectorAll("Worksheet Table Row:first-child Cell");
  if (headerRow) {
    for (let cell of Array.from(headerRow)) {
      tableData.push(cell.textContent as string);
    }
  }
  const dataRows = xmlDoc.querySelectorAll("Worksheet Table Row:not(:first-child)");
  for (let row of Array.from(dataRows)) {
    const cells = row.querySelectorAll("Cell");
    const rowData: any = {};
    for (let i = 0; i < cells.length; i++) {
      rowData[tableData[i]] = cells[i].textContent;
    }
    jsonData.push(rowData);
  }
  return jsonData;
};

const loadSetTemplate = (file: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;
    reader.readAsText(file);
  })
}

export const xmlToSet = async (file: any, setFile: any, applyMultiplier: boolean, data: IDataTable[]) => {

  try {
    const xmlDocument = await readXML(file);
    const jsonData = parseWorksheetToJson(xmlDocument);
    const setDocument = await loadSetTemplate(setFile);
    const paramNames = extractParamNames(setDocument);
    const invalidParamNames = [".forward", ".Forward", " Forward", " forward", ".fwd", ".Fwd", ".FORWARD", " FORWARD", " FWD", '.FWD', " fwd", " Fwd", "-fwd", '-Fwd', '-FWD', "-Forward", "-forward", '-FORWARD', "_fwd", "_Fwd", "_FWD", "_forward", "_Forward", "_FORWARD"];
    const outputData: { [key: string]: any }[] = [];

    jsonData.forEach((jdata: any) => {
      let inputString = setDocument;
      let name = file.name.replace(".xml", '') + "_" + jdata.Pass;
      let lotsizeM = 1;
      invalidParamNames.forEach((paramName: string) => {
        name = name.replace(paramName, '');
      });
      const matchingSet = data.find((set: any) => set["Optimisation Name"] + '_' + set["Back Pass"] === name);
      let lotMultiplier = 1;
      if (matchingSet) {
        lotMultiplier = matchingSet["Lot Multiplier_"];
        
      }
      
      if (jdata.LotSize === undefined) {
        const match = /\bLotSize=([^|]+)\|\|/g.exec(inputString);

        if (match) {
          jdata.LotSize = match[1];
        }
      }
      if (jdata.MaxLots === undefined) {
        const match = /\bMaxLots=([^|]+)\|\|/g.exec(inputString);
     
        if (match) {
          jdata.MaxLots = match[1];
        }
      }
      if (jdata.ProfitCloseEquityAmount === undefined) {
        const match = /\bProfitCloseEquityAmount=([^|]+)\|\|/g.exec(inputString);

        if (match) {
          jdata.ProfitCloseEquityAmount = match[1];
        }
      }
      if (jdata.MaxLossDailyInCurrency === undefined) {
        const match = /\bMaxLossDailyInCurrency=([^|]+)\|\|/g.exec(inputString);
 
        if (match) {
          jdata.MaxLossDailyInCurrency = match[1];
        }
      }
      if (jdata.InitialLotSize === undefined) {
        const match = /\bInitialLotSize=([^|]+)\|\|/g.exec(inputString);
 
        if (match) {
          jdata.InitialLotSize = match[1];
        }
      }
      if (jdata.InitialMaxLoss === undefined) {
        const match = /\bInitialMaxLoss=([^|]+)\|\|/g.exec(inputString);
     
        if (match) {
          jdata.InitialMaxLoss = match[1];
        }
      }
      if (jdata.MaxDailyLossTrail === undefined) {
        const match = /\bMaxDailyLossTrail=([^|]+)\|\|/g.exec(inputString);
      
        if (match) {
          jdata.MaxDailyLossTrail = match[1];
        }
      }
      paramNames.forEach(param => {
        let value = jdata[param];
        if (applyMultiplier) {
          if (param === "LotSize") {
            let newLotSize = Number((Number(value) * lotMultiplier).toFixed(2));
            newLotSize = Math.max(newLotSize, 0.01);
            lotsizeM = newLotSize / Number(value);
            value = newLotSize;
          } else if (
            param === "MaxLots" ||
            param === "ProfitCloseEquityAmount" ||
            param === "MaxLossDailyInCurrency" ||
            param === "InitialLotSize" ||
            param === "InitialMaxLoss" ||
            param === "MaxDailyLossTrail") {
            value = Number((Number(value) * lotsizeM).toFixed(0x2));
          }
        }
        if (value !== undefined) {
          const regex = new RegExp("\\b(" + param + ")=([^|]+)\\|\\|", 'g'); 
          inputString = inputString.replace(regex, `${param}=${value}||`);
         
        }
      });
   
      const newBlob = new Blob([inputString]);
      const newURL = URL.createObjectURL(newBlob);
      const linkName = name + '.set';
      outputData.push({
        name: linkName,
        url: newURL,
      })
    });

    outputData.sort((a, b) => {
      const va = parseInt(a.name.match(/\d+/)[0], 10);
      const vb = parseInt(b.name.match(/\d+/)[0], 10);
      return va - vb;
    })

    return outputData;
  } catch (e) {
    console.error(e, "error generating the files");
    return [];
  }
}

export enum MeasureType {
  GREATER = "greater",
  BALANCE = "balance",
  EQUITY = "equity",
}

function parseDate_2(dateString: string | null | undefined): Date {
  if (dateString) {
    const formattedDateString = dateString.replace(/\./g, '-').replace(' ', 'T') + 'Z';
    return new Date(formattedDateString);
  } else {
    return new Date();
  }
}

export const analyzeFile = (
  csvData: { [key: string]: string }[],
  dropTreshhold: number, 
  timeDistance: number, 
  name:string, 
  measureType: MeasureType) => {
    const timeDistanceInSecs = timeDistance * 0x3c * 0x3e8;
    let maxEquity = Number.NEGATIVE_INFINITY;
    let maxBalance = Number.NEGATIVE_INFINITY;
    let maxDrop = Number.NEGATIVE_INFINITY;

    for(let i = 0; i < csvData.length; i++){
      const row = csvData[i];
      const equity = parseFloat(row['<EQUITY>']);
      const balance = parseFloat(row['<BALANCE>']);
      const date = parseDate_2(row['<DATE>']);
      let dropThreshold: number;
      switch (measureType) {
        case MeasureType.EQUITY:
          dropThreshold = maxEquity;
          break;
        case MeasureType.GREATER:
          dropThreshold = maxDrop;
          break;
        case MeasureType.BALANCE:
          dropThreshold = maxBalance;
          break;
      }

      const drop = dropThreshold - equity;
      if (drop > 0) {
        dropTimes.push({
          date,
          drop,
          filename: name,
        });
      }
  
      if (equity > maxEquity) {
        maxEquity = equity;
      }
  
      if (balance > maxBalance) {
        maxBalance = balance;
      }
  
      maxDrop = Math.max(maxEquity, maxBalance);
    }
}

export const performAnalysis = async (
  dropTreshhold: number, 
  timeDistanceInMin :number,
  measureType: MeasureType,
  csvFiles: any[],
  globalTreshold: number
  ) => {
    const profitPerYearTable: any = [];
    resultDropTable.length = 0;
    dropTimes.length = 0;
    let maxGroupSum = 0;
    
    const timeDistanceInSecs = timeDistanceInMin * 0x3c * 0x3e8;

    const parsedCSVPromises = Array.from(csvFiles).map(csvFile => {
        return new Promise<void>((resolve,reject) => {
          Papa.parse(csvFile, {
            "header": true,
            "complete": (file) => {
                analyzeFile(file.data as { [key: string]: string }[],dropTreshhold,timeDistanceInMin,csvFile.name,measureType);
                resolve();
            },
            error: (err) => {
              reject(err);
            }
          })
        })
    })
    await Promise.all(parsedCSVPromises).then(() => {
      dropTimes.sort((a,b) => {
        return a.date.getTime() - b.date.getTime();
      })
      const dropSet = new Set<any>();
      const dropGroups: { date: Date; drop: number; filename: string }[][] = [];
      for (let i = 0; i < dropTimes.length; i++) {
        let group: { date: Date; drop: number; filename: string }[] = [dropTimes[i]];
        for (let j = i + 1; j < dropTimes.length; j++) {
          if (dropTimes[j].date.getTime() - dropTimes[i].date.getTime() <= timeDistanceInSecs) {
            const index = group.findIndex(
              (g) => g.filename === dropTimes[j].filename
            );
            if (index !== -1 && dropTimes[j].drop > group[index].drop) {
              group[index] = dropTimes[j];
            } else if (index === -1) {
              group.push(dropTimes[j]);
            }
          } else {
            break;
          }
        }
        let key = group.map(g => g.filename + g.date)
        .sort()
        .join(',');
        if(!dropSet.has(key) &&
           !(group.length === 1 &&
            dropGroups.some(dg=> dg.some(dg2 => dg2.filename === group[0].filename &&
              dg2.date === group[0].date) )
            )
        )
        {
          dropSet.add(key);
          dropGroups.push(group);
        }
      }

      let groupIndex = 1;

      for(let dg of dropGroups){
        dg.sort((a,b)=> a.date.getTime() - b.date.getTime());
        const totalDrop = dg.reduce((sum,curr)=> sum + curr.drop, 0);
        if(totalDrop > maxGroupSum){
          maxGroupSum = totalDrop;
        }
        if(totalDrop >= dropTreshhold){
          
          for(let value of dg){

            resultDropTable.push([
              moment(value.date).format("YYYY.MM.DD"),
              value.filename,
              value.drop.toFixed(2),
              groupIndex,
              totalDrop.toFixed(2)
            ])
          }
          groupIndex++;
        }
      }

    }).catch(e=> console.error(e));
    let balanceData:any = {};
    let csvFileData: any = {};
    let promises = Array.from(csvFiles).map(csvFile => {
      return new Promise<void>((resolve, reject) => {
        let name = csvFile.name;
        csvFileData[name] = {};
        let previousBalance: number|null = null;
        Papa.parse(csvFile, {
          'header': true,
          'complete': function (parsedData:any) {
            for (let row of parsedData.data) {
              const date = moment(row["<DATE>"], "YYYY.MM.DD HH:mm");
              const year = date.format("YYYY");
              const month = date.format('MM');
              const day = date.format('DD');
              const balance  = parseFloat(row["<BALANCE>"]);
              if (previousBalance !== null) {
                const balanceChange = balance - previousBalance;
                if (!balanceData[year]) {
                  balanceData[year] = {};
                }
                if (!balanceData[year][month]) {
                  balanceData[year][month] = {};
                }
                if (!balanceData[year][month][day]) {
                  balanceData[year][month][day] = 0;
                }
                balanceData[year][month][day] += balanceChange;
    
                if (!csvFileData[name][year]) {
                  csvFileData[name][year] = {};
                }
                if (!csvFileData[name][year][month]) {
                  csvFileData[name][year][month] = 0;
                }
                csvFileData[name][year][month] += balanceChange;
              }
              previousBalance = balance;
            }
            resolve();
          },
          'error': function (error) {
            reject(error);
          }
        });
      });
    });
    
    await Promise.all(promises).then(() => {
      let rowTotal = 0;
      for (let yearMonth in balanceData) {
        if (yearMonth === "Invalid date") {
          continue;
        }
        const row: any = { cells: [] };
        row.cells.push(yearMonth);
        
        for(let i = 1; i <= 12; i++){
          let cellValue = 0;
          let monthStr = i.toString().padStart(2, '0');
          if(balanceData[yearMonth][monthStr]){
            for (let value in balanceData[yearMonth][monthStr]) {
              cellValue += balanceData[yearMonth][monthStr][value];
            }
          }

          row.cells.push(cellValue.toFixed(2));
          rowTotal += cellValue;
        }
        row.cells.push(rowTotal.toFixed(2));

        profitPerYearTable.push(row);
        
        for (let monthDay = 1; monthDay <= 12; monthDay++) {
          rowTotal -= Number(row.cells[monthDay]);
        }
    }
  })

  const sums = profitPerYearTable.reduce((sums : any, row : any) => {
    row.cells.forEach((cell: any, index: any) => {
      if (index > 0) {
        sums[index - 1] = (sums[index - 1] || 0) + parseFloat(cell);
      }
    });
    return sums;
  }, []);
  resultDropTable.sort((a:any[],b: any[])=> a[3] - b[3]);
  const timesThatExceeded = resultDropTable.reduce((counter: number, row: any[]) => {
    if(row.at(-1) >= globalTreshold)
      counter++;

    return counter;
  },0)
  
  const totalRow = { cells: ["Total", ...sums] };
  const newData = [...profitPerYearTable, totalRow];
  return {
    profitPerYearTableHeader: ["Año/mes","ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic","total"],
    profitPerYearTable: newData,
    resultDropTableHeader: ["Fecha/Hora", "Archivo", "Valor DD $", "Numero de grupo", "Grupo global DD"],
    resultDropTable,
    maxGroupSum,
    timesThatExceeded,
  }
}

function randomColor(): string {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
  }
  return color;
}

const processData = (csvFiles: any[], balanceCheckboxValue: boolean)=> {
  let minY2 = Infinity;
  let maxY2 = -Infinity;

  let _0x406b28: Map<number, number> = new Map();
  let _0x17023c: Map<number, number> = new Map();
  let _0xbdf992: Map<string, number> = new Map();
  let _0x2725e0: Map<string, number> = new Map();
  let timestampSet: Set<number> = new Set();
  let filenameToValueMap: Map<string, number> = new Map();
  let fileDataMapByNumber1: Map<number, { [filename: string]: number }> = new Map();
  let fileDataMapByNumber2: Map<number, { [filename: string]: number }> = new Map();

  const initialValue: number = parseFloat(csvFiles[0].data[1][1]);

  chartData.data.datasets = [];

  csvFiles.forEach((csvFile) => {
    const csvFileValue: number = parseFloat(csvFile.data[0x1][0x1]);
    filenameToValueMap.set(csvFile.filename, csvFileValue);
  });

  csvFiles.forEach((file) => {
    _0xbdf992.set(file.filename, filenameToValueMap.get(file.filename) as number);
    _0x2725e0.set(file.filename, filenameToValueMap.get(file.filename) as number);
  });

  csvFiles.forEach((file: any) => {
    file.data.slice(1, -1).forEach((data: string[]) => {
      const timestamp: number = moment(data[0], 'YYYY-MM-DD HH:mm').valueOf();
      if (!isNaN(timestamp)) {
        timestampSet.add(timestamp);
        if (!fileDataMapByNumber1.has(timestamp)) {
          fileDataMapByNumber1.set(timestamp, {});
          fileDataMapByNumber2.set(timestamp, {});
        }
        const v1 = fileDataMapByNumber1.get(timestamp);
        if(v1){
          v1[file.filename] = parseFloat(data[2]) || 0;
        }
        const v2 = fileDataMapByNumber2.get(timestamp);
        if(v2){
          v2[file.filename] = parseFloat(data[1]) || 0;
        }
      }
    });
  });

  timestampSet = new Set(Array.from(timestampSet).sort((a, b) => a - b));

  timestampSet.forEach((value: number) => {
    let _0x5dd9a8: number = 0;
    let _0x59cb4c: number = 0;

    csvFiles.forEach((_0x1a692b: any) => {
          //@ts-ignore
        if (fileDataMapByNumber1.has(value) && fileDataMapByNumber1.get(value)[_0x1a692b.filename]) {
          //@ts-ignore
          _0xbdf992.set(_0x1a692b.filename, fileDataMapByNumber1.get(value)[_0x1a692b.filename]);
        }

        _0x5dd9a8 += (_0xbdf992.get(_0x1a692b.filename) || 0)  - (filenameToValueMap.get(_0x1a692b.filename) || 0) ;
          //@ts-ignore
        if (fileDataMapByNumber2.has(value) && fileDataMapByNumber2.get(value)[_0x1a692b.filename]) {
          //@ts-ignore
          _0x2725e0.set(_0x1a692b.filename, fileDataMapByNumber2.get(value)[_0x1a692b.filename]);
        }

        _0x59cb4c += (_0x2725e0.get(_0x1a692b.filename) || 0) - (filenameToValueMap.get(_0x1a692b.filename) || 0);
    });

    const newMinY2: number = _0x5dd9a8 + initialValue;
    const newMaxY2: number = _0x59cb4c + initialValue;
    
    _0x406b28.set(value, newMinY2);
    _0x17023c.set(value, newMaxY2);

    if (newMinY2 < minY2) {
      minY2 = newMinY2;
    }

    if (newMinY2 > maxY2) {
      maxY2 = newMinY2;
    }

    if (newMaxY2 < minY2) {
      minY2 = newMaxY2;
    }

    if (newMaxY2 > maxY2) {
      maxY2 = newMaxY2;
    }
  });
  
    (chartData.options as any).scales.y.ticks.suggestedMin = minY2;
    (chartData.options as any).scales.y.ticks.suggestedMax = maxY2;

    csvFiles.forEach((csvFile: any) => {
      const data_1: any[] = csvFile.data.slice(0x1, -0x1)
      .map((_0x33e87d: string[]): any => ({ x: _0x33e87d[0], y: parseFloat(_0x33e87d[2]) }));
      const data_2: any[] = csvFile.data.slice(0x1, -0x1)
      .map((_0x33e87d: string[]): any => ({ x: _0x33e87d[0], y: parseFloat(_0x33e87d[1]) }));

      const dataset_1 = {
        label: csvFile.filename + " (Equity)",
        data: data_1,
        fill: false,
        borderColor: randomColor(),
        tension: 0.1,
        spanGaps: true
      };

      const dataset_2 = {
        label: csvFile.filename + " (Balance)",
        data: data_2,
        fill: false,
        borderColor: randomColor(),
        tension: 0.1,
        spanGaps: true
      };

      chartData.data.datasets.push(dataset_1);
      chartData.data.labels.push(dataset_1.label);
      if (balanceCheckboxValue) {
        chartData.data.datasets.push(dataset_2);
        chartData.data.labels.push(dataset_2.label);
      }
    });

    const combinedData_1 = Array.from(_0x406b28.entries())
    .sort((a: [number, number], b: [number, number]) => a[0] - b[0])
    .map(([timestamp, value]: [number, number]) => (
      { x: moment(timestamp).format("YYYY.MM.DD HH:mm"), y: value }
      ));
    const combinedData_2= Array.from(_0x17023c.entries())
    .sort((a: [number, number], b: [number, number]) => a[0] - b[0])
    .map(([timestamp, value]: [number, number]) => (
      { x: moment(timestamp).format("YYYY.MM.DD HH:mm"), y: value }
      ));

    const combinedDataset_1 = {
      label: "Combined (Equity)",
      data: combinedData_1,
      fill: false,
      borderColor: "white",
      tension: 0.1,
      spanGaps: true
    };
    const combinedDataset_2 = {
      label: "Combined (Balance)",
      data: combinedData_2,
      fill: false,
      borderColor: "#00ff00",
      tension: 0.1,
      spanGaps: true
    };

    chartData.data.datasets.push(combinedDataset_1);
    chartData.data.labels.push(combinedDataset_1.label);

    if (balanceCheckboxValue) {
      chartData.data.datasets.push(combinedDataset_2);
      chartData.data.labels.push(combinedDataset_2.label);
    }

    const minTimestamp = Math.min(...Array.from(timestampSet));
    const maxTimestamp = Math.max(...Array.from(timestampSet));
    console.log("minTimestamp= ",minTimestamp);
    console.log("maxTimestamp= ",maxTimestamp);
    
    chartData.options.scales.x.min = minTimestamp;
    chartData.options.scales.x.max = maxTimestamp;

    return chartData;
}

export const chartDataUpdated = async (csvFiles: any[], isBalanceChecked= false) => {
  const dataPromises: Promise<any>[] = [];
  for (let i = 0x0; i < csvFiles.length; i++) {
    const file = csvFiles[i];
    const fileReader = new FileReader();
    const dataPromise = new Promise((resolve) => {
      fileReader.onload = function (read) {
        const dataResult = read.target?.result as string;
        const arrayDataResult = dataResult?.split("\n");
        const newData = [];
        for (let j = 0x0; j < arrayDataResult.length; j++) {
          const valueWithoutTab = arrayDataResult[j].split("\t");
          newData.push(valueWithoutTab);
        }
        resolve({
          'data': newData,
          'filename': file.name
        });
      };
    });
    fileReader.readAsText(file);
    dataPromises.push(dataPromise);
  }
  const data = await Promise.all(dataPromises);
  const dataChart = await processData(data, isBalanceChecked);
  return dataChart;
}