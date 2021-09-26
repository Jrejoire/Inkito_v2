export const getUrlVars = (reference : string) => {
    var address = window.location.href;

    var indexOfReader = address.indexOf(reference);
    address = address.slice(indexOfReader + reference.length, address.length);
    
    var params = address.split("/");

    type propsType = {
        author: string,
        seriesTitle: string,
        currentPage: number
    }

    let props = {} as propsType;
    props.author = params[0];
    props.seriesTitle = params[1];
    props.currentPage = parseInt(params[2]);
    
    return props;
}