import "dotenv/config"
import { OpenAI } from "openai"

const client = new OpenAI();

async function main() {

    const system_prompt =
        `
        You are a AI Assistant who works on START , THINK, EVALUATE AND OUTPUT format.
        Whenever user ask you a question you will be breaking down that problem into simpler terms
        and solve those smaller problem one by one.

        Rules : 
        1. Always provide the output in JSON Format
        2. Always follow one step at a time and wait for that step to be completed first before performing another step.
        3. Steps should always be in the order of START , THINK , EVALUATE AND OUTPUT.
        4. Always do multiple think step before providing the final output.
        5. Before providing the final output aways think weather the output is correct or not.

        OUTPUT FORMAT :
        { "step" : "START | THINK | EVALUATE | OUTPUT" , "content" : "string" }

        Examples :
        user : What is 10 * 20 - 10 * 30 + 10 * 40.
        assistant : { " step " : "START" , content : " User wants me to ask the maths problem 10 * 20 - 10 * 30 + 10 * 40 ! "}
        assistant : { " step " : "THINK" , content : " For solving this problem i will be using BODMAS "}
        devloper : { " step " : "EVALUATE" , content : " Everything looks good "}
        assistant : { " step " : "THINK" , content : " So first i will do multiplication of 10 * 20 which is 200 now my equation will become like 200 - 10 * 30 + 10 * 40"}
        devloper : { " step " : "EVALUATE" , content : " Everything looks good "}
        assistant : { " step " : "THINK" , content : " So first i will do multiplication of 10 * 30 which is 300 now my equation will become like 200 - 300 + 10 * 40"}
        devloper : { " step " : "EVALUATE" , content : " Everything looks good "}
        assistant : { " step " : "THINK" , content : " So first i will do multiplication of 10 * 40 which is 400 now my equation will become like 200 - 300 + 400"}
        devloper : { " step " : "EVALUATE" , content : " Everything looks good "}
        assistant : { " step " : "THINK" , content : " 200 - 300 + 400 is 300"}
        devloper : { " step " : "EVALUATE" , content : " Everything looks good "}
        assistant : { " step " : "THINK" , content : "Great i got my final output which is 300"}
        devloper : { " step " : "EVALUATE" , content : " Everything looks good "}
        assistant : { " step " : "OUTPUT" , content : "The answer for this equation is 300 ."}
    
    `

    const message = [
        {
            role: 'system',
            content: system_prompt
        },
        {
            role: 'user',
            content: "what is the solution of 10 * 20 - 40 * 50"
        },
    ]

    // stateless 
    while (true) {
        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages: message
        })

        const content = response.choices[0].message.content;
        const parsedContent = JSON.parse(content);





        if (parsedContent.step === "START") {
            console.log("Starting ..... \n");
            console.log(parsedContent);
            message.push({
                role: 'assistant',
                content: JSON.stringify(parsedContent)
            })
        }
        else if (parsedContent.step === "THINK") {
            console.log("THINKING ..... \n");
            console.log(parsedContent)
            message.push({
                role: 'assistant',
                content: JSON.stringify(parsedContent)
            })
        }
        else if (parsedContent.step === "EVALUATE") {
            // API CALL TO GEMINI
            console.log("EVALUATING .... ");
            message.push({
                role: 'developer',
                content: JSON.stringify("Everything looks good ")
            })
        }
        else if (parsedContent.step === "OUTPUT") {
            console.log("END OF CHAT")
            console.log(parsedContent);
            message.push({
                role: 'assistant',
                content: JSON.stringify(parsedContent)
            })
            break;
        }
    }
}

main();