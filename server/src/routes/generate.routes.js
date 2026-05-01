import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect);

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    console.log(
      "Generating app for:",
      prompt
    );

    const response =
      await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

            "Content-Type": "application/json",

            "HTTP-Referer": "https://nxtbuild-ai-web-app-builder.vercel.app",

            "X-Title": "NxtBuild",
          },

          body: JSON.stringify({
            model:
              "openai/gpt-3.5-turbo",

            messages: [
              {
                role: "system",

                content: `
You are an expert frontend developer.

Generate BEAUTIFUL modern web apps.

Rules:

- Return ONLY ONE complete HTML file
- Include HTML, CSS, and JavaScript
- Use modern UI design
- Add animations
- Add gradients
- Add shadows
- Make it responsive
- Use professional spacing
- Use modern fonts
- Add hover effects
- Make it visually impressive
- Dark mode if relevant
- Use clean layouts

IMPORTANT:

- Return ONLY raw HTML
- No markdown
- No backticks
- No explanations

The app should look like a modern startup product UI.
`,
              },

              {
                role: "user",

                content: prompt,
              },
            ],
          }),
        }
      );

    const data =
      await response.json();

    console.log(data);

    if (data.error) {
      return res.status(500).json({
        success: false,

        message:
          data.error.message ||
          "AI generation failed",
      });
    }

    let code =
      data.choices?.[0]
        ?.message?.content || "";

    code = code
      .replace(
        /```html/gi,
        ""
      )
      .replace(
        /```/g,
        ""
      )
      .trim();

    return res.json({
      success: true,

      code,

      reply:
        "App generated successfully",
    });
  } catch (err) {
    console.error(
      "Generate Error:",
      err
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to generate app",
    });
  }
});

export default router;