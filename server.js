import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 3000);
const here = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(here, "public")));

const key = process.env.GEMINI_API_KEY;
const ai = key ? new GoogleGenAI({ apiKey: key }) : null;
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
// Si agregan personajes, actualicen esta lista y public/data.js.
const catalog = [
  // ANIME Y MANGA
  "Shigeo “Mob” Kageyama — Mob Psycho 100: sensible, reservado, empático y en crecimiento.",
  "Reigen Arataka — Mob Psycho 100: carismático, ingenioso, imperfecto y protector.",
  "Arataka Reigen — Mob Psycho 100: sociable, persuasivo y con un lado humano.",
  "Kenma Kozume — Haikyuu!!: observador, estratégico, tranquilo y reservado.",
  "Shoyo Hinata — Haikyuu!!: entusiasta, perseverante, curioso y sociable.",
  "Tobio Kageyama — Haikyuu!!: competitivo, dedicado y directo.",
  "Killua Zoldyck — Hunter x Hunter: inteligente, reservado, leal y protector.",
  "Gon Freecss — Hunter x Hunter: optimista, curioso, decidido y aventurero.",
  "Kurapika — Hunter x Hunter: analítico, serio, justo y determinado.",
  "Saiki Kusuo — The Disastrous Life of Saiki K.: reservado, sarcástico y práctico.",
  "Shun Kaidou — The Disastrous Life of Saiki K.: imaginativo, dramático y sensible.",
  "L — Death Note: analítico, curioso, reservado y atento a los detalles.",
  "Light Yagami — Death Note: inteligente, estratégico y ambicioso.",
  "Anya Forger — Spy x Family: expresiva, curiosa, juguetona y afectuosa.",
  "Loid Forger — Spy x Family: organizado, observador y responsable.",
  "Bocchi Hitori — Bocchi the Rock!: tímida, creativa, musical y sensible.",
  "Nijika Ijichi — Bocchi the Rock!: optimista, amable y compañera.",
  "Mafuyu Asahina — Project SEKAI: introspectiva, reservada y compleja.",
  "Kanade Yoisaki — Project SEKAI: creativa, dedicada y sensible.",
  "Miku Hatsune — Vocaloid: creativa, musical y expresiva.",
  "Atsushi Nakajima — Bungou Stray Dogs: sensible, amable y perseverante.",
  "Osamu Dazai — Bungou Stray Dogs: ingenioso, impredecible y observador.",
  "Chuuya Nakahara — Bungou Stray Dogs: apasionado, orgulloso y leal.",
  "Eren Yeager — Attack on Titan: intenso, decidido y apasionado.",
  "Armin Arlert — Attack on Titan: reflexivo, curioso y estratégico.",
  "Mitsuha Miyamizu — Your Name: curiosa, decidida y soñadora.",
  "Shoyo Ishida — A Silent Voice: introspectivo, arrepentido y en crecimiento.",

  // K-DRAMAS
  "Choi Ung — Our Beloved Summer: artístico, tranquilo, sensible y reservado.",
  "Kook Yeon-su — Our Beloved Summer: independiente, trabajadora y exigente consigo misma.",
  "Kim Bok-joo — Weightlifting Fairy Kim Bok-joo: sincera, leal, alegre y perseverante.",
  "Nam Do-san — Start-Up: tímido, creativo y apasionado por sus proyectos.",
  "Hong Du-sik — Hometown Cha-Cha-Cha: servicial, sociable y atento a su comunidad.",
  "Yoon Se-ri — Crash Landing on You: independiente, ingeniosa y decidida.",
  "Ri Jeong-hyeok — Crash Landing on You: responsable, reservado y protector.",
  "Moon Gang-tae — It's Okay to Not Be Okay: paciente, cuidador y responsable.",
  "Ko Mun-yeong — It's Okay to Not Be Okay: directa, intensa y creativa.",
  "Cha Eun-jae — Dr. Romantic: dedicada, sensible y perseverante.",

  // SERIES
  "Wednesday Addams — Wednesday: independiente, observadora, directa y creativa.",
  "Enid Sinclair — Wednesday: sociable, expresiva, optimista y leal.",
  "Eleven — Stranger Things: reservada, valiente y protectora.",
  "Dustin Henderson — Stranger Things: curioso, ingenioso y amistoso.",
  "Will Byers — Stranger Things: sensible, creativo y reservado.",
  "Robin Buckley — Stranger Things: ingeniosa, habladora y auténtica.",
  "Sherlock Holmes — Sherlock: analítico, observador e independiente.",
  "Luna Lovegood — Harry Potter: imaginativa, amable y auténtica.",
  "Rory Gilmore — Gilmore Girls: curiosa, lectora y dedicada.",
  "Maeve Wiley — Sex Education: inteligente, independiente y reservada.",
  "Abed Nadir — Community: observador, creativo y apasionado por la ficción.",
  "Chidi Anagonye — The Good Place: reflexivo, estudioso y preocupado por hacer lo correcto.",
  "Anne Shirley — Anne with an E: imaginativa, apasionada y expresiva.",

  // PELÍCULAS
  "Miles Morales — Spider-Verse: creativo, leal y buscando su propio camino.",
  "Peter Parker — Spider-Man: Homecoming: ingenioso, curioso y responsable.",
  "Miguel Rivera — Coco: apasionado por la música y decidido a seguir sus sueños.",
  "Hiccup Haddock — How to Train Your Dragon: creativo, empático e ingenioso.",
  "Astrid Hofferson — How to Train Your Dragon: valiente, independiente y estratégica.",
  "Violet Parr — The Incredibles: reservada, sensible y protectora.",
  "Linguini — Ratatouille: inseguro, amable y dispuesto a aprender.",
  "Remy — Ratatouille: creativo, curioso y apasionado por cocinar.",
  "Mulan — Mulan: valiente, ingeniosa y perseverante.",
  "Rapunzel — Tangled: curiosa, creativa y aventurera.",
  "Belle — Beauty and the Beast: lectora, curiosa e independiente.",
  "Hiro Hamada — Big Hero 6: inteligente, inventivo y curioso.",
  "Baymax — Big Hero 6: cuidador, paciente y amable.",
  "Megara — Hercules: ingeniosa, sarcástica e independiente.",
  "Po — Kung Fu Panda: divertido, perseverante y apasionado.",

  // LIBROS
  "Hermione Granger — Harry Potter: curiosa, estudiosa, leal y valiente.",
  "Harry Potter — Harry Potter: valiente, leal y dispuesto a ayudar.",
  "Neville Longbottom — Harry Potter: sensible, amable y valiente a su manera.",
  "Jo March — Little Women: creativa, independiente y apasionada.",
  "Elizabeth Bennet — Pride and Prejudice: ingeniosa, observadora e independiente.",
  "Matilda Wormwood — Matilda: inteligente, lectora, curiosa y justa.",
  "Percy Jackson — Percy Jackson: sarcástico, leal y aventurero.",
  "Annabeth Chase — Percy Jackson: estratégica, estudiosa y decidida.",
  "Alice — Alice's Adventures in Wonderland: curiosa, imaginativa y aventurera.",

  // VIDEOJUEGOS
  "Kirby — Kirby: alegre, amistoso y aventurero.",
  "Link — The Legend of Zelda: valiente, silencioso y perseverante.",
  "Zelda — The Legend of Zelda: sabia, curiosa y responsable.",
  "Sonic — Sonic the Hedgehog: rápido, independiente y confiado.",
  "Tails — Sonic the Hedgehog: inteligente, creativo y leal.",
  "Pikachu — Pokémon: enérgico, leal y afectuoso.",
  "Eevee — Pokémon: adaptable, curioso y amigable.",
  "Satoru Gojo — Jujutsu Kaisen: carismático, confiado y protector.",
  "Yuji Itadori — Jujutsu Kaisen: amable, decidido y empático.",
  "Megumi Fushiguro — Jujutsu Kaisen: reservado, reflexivo y protector.",
  "Furina — Genshin Impact: expresiva, teatral y sensible.",
  "Nahida — Genshin Impact: curiosa, sabia y compasiva."
];const questions = [
  "Cuando llegás a un lugar nuevo, ¿qué solés hacer?",
  "¿Qué valorás más en una amistad?",
  "Cuando tenés un problema, ¿cómo reaccionás?",
  "¿Qué actividad te representa más?",
  "¿Cómo mostrás que alguien te importa?",
  "¿Qué te gustaría aprender sobre vos?",
  "¿Qué ambiente te hace sentir más cómodo?"
];

app.get("/api/status", (_req, res) => res.json({ aiConfigured: Boolean(ai) }));


app.post("/api/match", async (req, res) => {
  if (!ai) {
    return res.status(503).json({
      error: "Falta GEMINI_API_KEY en el archivo .env."
    });
  }

  const answers = req.body?.answers;

  if (!Array.isArray(answers) || answers.length !== questions.length) {
    return res.status(400).json({
      error: "Completá todas las preguntas."
    });
  }

  const safe = answers.map((answer, i) =>
    `${questions[i]}\nRespuesta: ${String(answer).slice(0, 240)}`
  ).join("\n\n");

  try {
    const response = await ai.models.generateContent({
      model,
      contents:
        `Catálogo permitido:\n${catalog.map(x => "- " + x).join("\n")}\n\n` +
        `Respuestas del test:\n${safe}`,
      config: {
        systemInstruction:
          "Respondé en español rioplatense sencillo y cálido. " +
          "Esto es un juego de afinidad, no un diagnóstico. " +
          "Elegí exactamente un personaje del catálogo permitido. " +
          "Explicá la coincidencia en 2 a 4 frases. " +
          "Usá este formato: PERSONAJE: [nombre] / OBRA: [obra] / " +
          "POR QUÉ: [explicación] / UNA FORTALEZA TUYA: [fortaleza]. " +
          "No pidas datos privados.",
        maxOutputTokens: 300
      }
    });

    res.json({
      result: response.text || "No pude generar el resultado. Intentá otra vez."
    });
  } catch (error) {
    console.error("Error de Gemini:", error?.message || "desconocido");

    res.status(502).json({
      error: "No pude conectar con Gemini. Revisá el error en PowerShell."
    });
  }
});


app.post("/api/chat", async (req, res) => {
  if (!ai) {
    return res.status(503).json({
      error: "Falta GEMINI_API_KEY en el archivo .env."
    });
  }

  const messages = req.body?.messages;

  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: "Escribí un mensaje." });
  }

  const safe = messages.slice(-10).map(m => ({
    role: m?.role === "assistant" ? "Asistente" : "Usuario",
    content: String(m?.content || "").slice(0, 1000)
  })).filter(m => m.content.trim());

  try {
    const conversation = safe
      .map(m => `${m.role}: ${m.content}`)
      .join("\n\n");

    const response = await ai.models.generateContent({
      model,
      contents: conversation,
      config: {
        systemInstruction:
          "Sos el chat de la web escolar ¿Qué personaje sos?. " +
          "Hablá en español rioplatense sencillo, amable y breve. " +
          "Podés charlar sobre anime, manga, K-dramas, series, películas " +
          "y personajes. Aclarà que la afinidad es un juego, no una " +
          "evaluación psicológica. No solicites información privada, " +
          "contraseñas ni datos de contacto.",
        maxOutputTokens: 700
      }
    });

    res.json({
      reply: response.text || "No me salió una respuesta esta vez. ¿Probamos de nuevo?"
    });
  } catch (e) {
    console.error("Error de chat Gemini:", e?.status || e?.message || "desconocido");

    const status = Number(e?.status);
    if (status === 429) {
      return res.status(429).json({
        error: "Se alcanzó un límite de uso de Gemini. Esperá un rato y probá de nuevo."
      });
    }

    if (status === 400 || status === 401 || status === 403) {
      return res.status(status).json({
        error: "Gemini rechazó la solicitud. Revisá la clave y el modelo configurados."
      });
    }

    return res.status(502).json({
      error: "No pude conectar con Gemini. Revisá internet y volvé a intentar."
    });
  }
});

app.listen(PORT, () => {
  console.log(`¿Qué personaje sos? funcionando en http://localhost:${PORT}`);
  console.log(ai ? "Gemini configurado." : "Falta configurar GEMINI_API_KEY en .env.");
  console.log("Para detener el servidor, presioná Ctrl + C.");
});
