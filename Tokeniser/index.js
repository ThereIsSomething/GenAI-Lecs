// import { Tiktoken } from "js-tiktoken/lite";
// import o200k_base from "js-tiktoken/ranks/o200k_base";

// const enc = new Tiktoken(o200k_base);
// const token = enc.encode("hello world");

// console.log(token);

// console.log(enc.decode([ 24912, 2375 ]));

import OpenAI from "openai";
import "dotenv/config";
const openai = new OpenAI();


const embedding = await openai.embeddings.create({
  model: "text-embedding-3-large",
  input: "Hello world",
  encoding_format: "float",
});

console.log(embedding.data[0].embedding.length);