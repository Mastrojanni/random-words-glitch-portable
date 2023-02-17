"use strict"

// Global constants
const RANDOMIZE_DOM_NAME = 'randomize';

const randomizeWordsGlitch = (finalWord="") => {

    // init vars
    const countToFinalWord = 12;
    let currentCountToFinalWord = 0;

    const targetDomNames = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'a', 'span', 'button', 'code',
        'input', 'samp', 'strong', 'b', 'li',
        'time', 'label'
    ];

    const targetDomElements = [];

    // get all text node from the DOM
    for (let i=0; i < targetDomNames.length; i++) {

        const targetDomElement = document.querySelectorAll(targetDomNames[i]);

        if (!targetDomElement || targetDomElement.length < 1) {
            continue;
        }

        for (let j=0; j < targetDomElement.length; j++) {

            const subElement = targetDomElement[j];

            if (!subElement) continue;
            targetDomElements.push(subElement);
        }
    }

    const intervalId = setInterval(() => {

        // for each target
        for (let i=0; i < targetDomElements.length; i++) {

            const splitTargetContent = targetDomElements[i].innerText.split(" ");
            const splitTargetContentLength = splitTargetContent?.length;

            if (!splitTargetContent || !splitTargetContentLength) {

                targetDomElements[i].innerText = Math.random().toString(36).slice(2, 12);
                continue;
            }

            // for each word
            for (let j=0; j < splitTargetContentLength; j++) {

                const word = splitTargetContent[j];
                const wordLength = word?.length;

                if (currentCountToFinalWord >= (countToFinalWord + 1)) {
                    clearInterval(intervalId);
                    return;
                }

                if (currentCountToFinalWord >= countToFinalWord) {
                    splitTargetContent[j] = finalWord?.toString();
                    continue;
                }

                if (wordLength < 3) {

                    splitTargetContent[j] = Math.random().toString(36).slice(2, 3);
                    continue;
                }

                if (wordLength > 12) {

                    splitTargetContent[j] = Math.random().toString(36).slice(2, 11);
                    continue;
                }

                splitTargetContent[j] = Math.random().toString(36).slice(2, 2 + wordLength);
            }

            targetDomElements[i].innerText = splitTargetContent.join(" ");
        }

        currentCountToFinalWord++;

    }, 1400);
};

const main = () => {

    const randomizeDomElement = document.getElementById(RANDOMIZE_DOM_NAME);
    
    if (!randomizeDomElement) return;

    randomizeDomElement.addEventListener("click", () => randomizeWordsGlitch());
};

main();
