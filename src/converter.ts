export const authorConverter = (elem: Element | null) => {
    if (!elem) return "";

    const authorInfoList = Array.from(elem.getElementsByTagName("li")).slice(1);

    const authorNameList = authorInfoList.map(
        (item) => item.getElementsByTagName("a")[0].innerText
    );

    return authorNameList.join(", ");
};

export const htmlCleaner = (text: string) =>
    text.replace(/<[^>]+>/g, "").trim();
