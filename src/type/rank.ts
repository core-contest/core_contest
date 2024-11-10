export interface RankResponseType {
    status: number;
    success: boolean;
    message: string;
    data: {
        rankList: RankType [],
        myRank: number;
    }
}
export interface RankType {
    name: string;
    ssn: number;
    score: number;
}
