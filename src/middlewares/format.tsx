export const seriesIdGenerator = (author: string, title: string) => {
    if (author && title) {
        let authorId = author.replace(/[^A-Za-z0-9]/g, "");
        let titleId = title.replace(/[^A-Za-z0-9]/g, "");
    
        let string = `${authorId}-${titleId}`;
        let seriesId = string.toLowerCase().slice(0, 24);
    
        return seriesId as string;
    } else {
        return "";
    }
}

export const isContentRanked = (contentDate : string) => {
    var g1 = new Date().toISOString().substring(0, 10);
    var t1 = new Date().toISOString().substring(11, 19)
    var g2 = contentDate.substring(0, 10);
    var t2 = contentDate.substring(11, 19);
    if (g1 >= g2) {
        let g1Split = g1.split("-");
        let g2Split = g2.split("-");
        let g1Int = g1Split.map(string => parseInt(string));
        let g2Int = g2Split.map(string => parseInt(string));
        let g3 = [g1Int[0] - g2Int[0], g1Int[1] - g2Int[1], g1Int[2] - g2Int[2]];

        if (g3[0] > 0 || g3[1] > 0 || g3[2] > 7) {
            return false;
        } else if (g3[2] === 7) {
            if (t1 > t2) {
                return false;
            } else {
                return true;
            }
        } else if (g3[0] === 0 && g3[1] === 0 && g3[2] < 7) {
            return true;
        }
    } 
}

export const timeAgo = (contentDate : string) => {
    var g1 = new Date().toISOString().substring(0, 10);
    var g2 = contentDate;
    if (g1 >= g2) {
        let g1Split = g1.split("-");
        let g2Split = g2.split("-");
        let g1Int = g1Split.map(string => parseInt(string));
        let g2Int = g2Split.map(string => parseInt(string));

        let g3 = [g1Int[0] - g2Int[0], g1Int[1] - g2Int[1], g1Int[2] - g2Int[2]]
        if (g3[0] > 0) {
            return g3[0] === 1 ? `${g3[0]} year ago` : `${g3[0]} years ago`;
        } else if (g3[1] > 0) {
            return g3[1] === 1 ? `${g3[1]} month ago` : `${g3[1]} months ago`;
        } else if (g3[2] > 0) {
            return g3[2] === 1 ? `${g3[2]} day ago` : `${g3[2]} days ago`;
        }
    } 
}