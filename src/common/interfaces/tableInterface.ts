
export type DataTableRow = {
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
    "Forward Profit": string;
    "Forward Recovery Factor": string;
    "Forward Equity DD %": string;
    "Forward Trades": string;
    "ProfitMatch%": string;
    "Total Original Profit": string;
    "Max original DD": string;
    "Lot Multiplier": number;
    "Total Estimated Profit": string;
    "Max Estimated DD": string;
    "POW Score": string;
   }

export const DisplayColumns = [
    "Optimisation Name",
    "Back Pass",
    "Back Result",
    "Back Profit",
    "Back Recovery Factor",
    "Back Equity DD %",
    "Back Trades",
    "Forward Pass",
    "Forward Forward Result",
    "Forward Profit",
    "Forward Recovery Factor",
    "Forward Equity DD %",
    "Forward Trades",
    "ProfitMatch%",
    "Total Original Profit",
    "Max original DD",
    "Lot Multiplier",
    "Total Estimated Profit",
    "Max Estimated DD",
    "POW Score"
]