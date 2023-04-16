import { authorConverter, htmlCleaner } from "./converter";

const contentAndSelector: {
    name: string;
    selector: string;
    converter?: (elem: Element | null) => string;
}[] = [
    {
        name: "Title",
        selector:
            "#pb-page-content > div > main > div.container > article > div:nth-child(1) > div.col-md-8.col-sm-7 > div > div > div:nth-child(2) > h1",
    },
    {
        name: "Author",
        selector: "#sb-1 > ul",
        converter: authorConverter,
    },
    {
        name: "Publish Info",
        selector:
            "#pb-page-content > div > main > div.container > article > div:nth-child(1) > div.col-md-8.col-sm-7 > div > div > div:nth-child(4) > div > a > span",
    },
    {
        name: "Abstract",
        selector: ".abstractSection,.abstractInFull",
    },
];

const copyToClipboard = (newClip: string) => {
    navigator.clipboard.writeText(newClip).then(
        () => {
            /* clipboard successfully set */
            console.log("copied to clipboard!!");
        },
        () => {
            /* clipboard write failed */
            console.error("clipboard write failed");
        }
    );
};

const main = () => {
    const gotItemList: { title: string; text: string }[] = [];

    contentAndSelector.map((item) => {
        const elem = document.querySelector(item.selector);

        if (!item.converter) {
            gotItemList.push({
                title: item.name,
                text: htmlCleaner((elem?.innerHTML ?? "") as string),
            });
        } else {
            gotItemList.push({
                title: item.name,
                text: htmlCleaner(item.converter(elem)),
            });
        }
    });

    gotItemList.splice(3, 0, { title: "Link", text: window.location.href });

    copyToClipboard(
        `# ${gotItemList[0].text}\n\n` +
            gotItemList
                .slice(1)
                .map((item) => `## ${item.title}\n\n${item.text}`)
                .join("\n\n")
    );
};

window.addEventListener("load", main);
