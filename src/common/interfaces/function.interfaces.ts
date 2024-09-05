export interface ExtractedRowData extends BackFileDataItem, ForwardFileDataItem, ExtraInfo{
    "Optimisation Name": string;
}

export type BackFileDataItem = {
    "Optimisation Name"?: string;
    "Back Pass"?: string;
    "Back Profit"?: string;
    "Back Equity DD %"?: string;
    "Back Recovery Factor": string;
    csvData?: string;
  };
  
export type ForwardFileDataItem = {
    "Forward Pass": string;
    "Forward Profit"?: string;
    "Forward Equity DD %"?: string;
    "Forward Recovery Factor": string;
  };

export type ExtraInfo = {
    "ProfitMatch%": string;
    "POW Score"?: any;
    "Total Original Profit": string;
    "Max original DD": string;
    "Lot Multiplier_": number;
    "Lot Multiplier": number;
    "Total Estimated Profit": string;
    "Max Estimated DD": string;
    "Forward Back Result": string;
    "Forward Forward Result": string;
  }

export type IDataTable = {
 [key: string]: string | number;
"Optimisation Name": string;
"Back Pass": string;
"Back Result": string;
"Back Profit": string;
"Back Recovery Factor": string;
"Back Equity DD %": string;
"Back Trades": string;
"Forward Pass": string;
"Forward Forward Result": string;
"Forward Back Result": string;
"Forward Profit": string;
"Forward Recovery Factor": string;
"Forward Equity DD %": string;
"Forward Trades": string;
"ProfitMatch%": string;
"Total Original Profit": string;
"Max original DD": string;
"Lot Multiplier_": number;
"Lot Multiplier": number;
"Total Estimated Profit": string;
"Max Estimated DD": string;
"POW Score": string;
}
  
export type AnalysisDataItem = BackFileDataItem & ForwardFileDataItem & ExtraInfo;
