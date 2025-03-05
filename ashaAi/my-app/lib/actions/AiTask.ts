import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { PromptTemplate } from "@langchain/core/prompts";
import {GoogleGenerativeAI} from "@google/generative-ai"
const genAI = new GoogleGenerativeAI(`AIzaSyAbTRn-X33UfV91lkTH_lUbfCowV627YYM`)


export async function AnalyzeSymtomaticDisease(symptomText : string ) {
    
    const model = genAI.getGenerativeModel({
        model : "gemini-1.5-flash"
      })

    const template = await model.generateContent([
        `You are a doctor analyzing symptoms from rural ASHA workers you can ask more details if you want too and give a detail answer.
        Symptom: "${symptomText}"
        Respond ONLY in JSON format:
        {{
            "condition": "possible_condition",
            "severity": "low/medium/high",
            "action": "recommended_action"
        }}`
    ])
   
    return template.response.text()

   
   
}


// console.log(await Analyze("severe stomach pain radiating to right side"))


