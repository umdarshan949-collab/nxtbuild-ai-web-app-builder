import { useState, useEffect, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  getProject,
  updateProject,
  generateCode,
} from "../services/api";

import Navbar from "../components/Navbar";

import "../styles/builder.css";

const EXAMPLES = [
  "A todo app with dark mode",
  "A weather dashboard UI",
  "A landing page for a SaaS",
  "A calculator app",
];

export default function Builder() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [project, setProject] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [tab, setTab] =
    useState("preview");

  const [title, setTitle] =
    useState("New Project");

  const messagesEndRef =
    useRef(null);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [messages]);

  const fetchProject =
    async () => {
      try {
        const res =
          await getProject(id);

        const p =
          res.data.project;

        if (!p) {
          navigate(
            "/dashboard"
          );

          return;
        }

        setProject(p);

        setTitle(
          p.title ||
            "New Project"
        );

        setMessages(
          p.messages || []
        );
      } catch (err) {
        console.error(err);

        navigate(
          "/dashboard"
        );
      }
    };

  const handleSend =
    async (text) => {
      const msg =
        text || input.trim();

      if (!msg || loading)
        return;

      setInput("");

      const userMsg = {
        role: "user",

        content: msg,

        time:
          new Date().toISOString(),
      };

      const updatedMessages =
        [
          ...messages,
          userMsg,
        ];

      setMessages(
        updatedMessages
      );

      setLoading(true);

      try {
        const res =
          await generateCode({
            prompt: msg,
          });

        const generatedCode =
          res.data.code ||
          "";

        const aiMsg = {
          role: "ai",

          content:
            res.data.reply ||
            "Generated successfully",

          time:
            new Date().toISOString(),
        };

        const finalMessages =
          [
            ...updatedMessages,
            aiMsg,
          ];

        setMessages(
          finalMessages
        );

        const updatedProject =
          {
            ...(project ||
              {}),

            code: generatedCode,
          };

        setProject(
          updatedProject
        );

        await updateProject(
          id,
          {
            code:
              generatedCode,

            messages:
              finalMessages,

            title:
              title ===
              "New Project"
                ? msg.slice(
                    0,
                    40
                  )
                : title,
          }
        );

        if (
          title ===
          "New Project"
        ) {
          setTitle(
            msg.slice(
              0,
              40
            )
          );
        }

        setTab("preview");
      } catch (err) {
        console.error(err);

        setMessages([
          ...updatedMessages,

          {
            role: "ai",

            content:
              "Failed to generate app",

            time:
              new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

  const handleKeyDown =
    (e) => {
      if (
        e.key ===
          "Enter" &&
        !e.shiftKey
      ) {
        e.preventDefault();

        handleSend();
      }
    };

  return (
    <div
      style={{
        height: "100vh",

        display: "flex",

        flexDirection:
          "column",
      }}
    >
      <Navbar />

      <div className="builder">
        <div className="builder-chat">
          <div className="builder-chat-header">
            <div className="builder-chat-title">
              {title}
            </div>
          </div>

          <div className="builder-messages">
            {messages.length ===
            0 ? (
              <div className="builder-empty-chat">
                <div className="builder-empty-title">
                  What shall we
                  build?
                </div>

                <div className="builder-examples">
                  {EXAMPLES.map(
                    (ex) => (
                      <button
                        key={ex}
                        className="builder-example-chip"
                        onClick={() =>
                          handleSend(
                            ex
                          )
                        }
                      >
                        {ex}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="builder-messages-list">
                {messages.map(
                  (
                    msg,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className={`chat-message ${
                        msg.role ===
                        "user"
                          ? "chat-message-user"
                          : "chat-message-ai"
                      }`}
                    >
                      <div className="chat-bubble">
                        {
                          msg.content
                        }
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="chat-bubble">
                    Generating...
                  </div>
                )}

                <div
                  ref={
                    messagesEndRef
                  }
                />
              </div>
            )}
          </div>

          <div className="chat-input-container">
            <textarea
              className="chat-input-textarea"
              placeholder="Describe what to build..."
              value={input}
              onChange={(
                e
              ) =>
                setInput(
                  e.target
                    .value
                )
              }
              onKeyDown={
                handleKeyDown
              }
            />

            <button
              className="chat-send-btn"
              onClick={() =>
                handleSend()
              }
            >
              Send
            </button>
          </div>
        </div>

        <div className="builder-preview">
          <div className="builder-tabs">
            <button
              className={`builder-tab ${
                tab ===
                "preview"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setTab(
                  "preview"
                )
              }
            >
              Preview
            </button>

            <button
              className={`builder-tab ${
                tab ===
                "code"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setTab(
                  "code"
                )
              }
            >
              Code
            </button>
          </div>

          <div className="builder-content">
            {tab ===
            "preview" ? (
              project?.code ? (
                <iframe
                  key={
                    project.code
                  }
                  className="preview-iframe"
                  srcDoc={
                    project.code
                  }
                  title="preview"
                  sandbox="allow-scripts"
                  style={{
                    width:
                      "100%",

                    height:
                      "100%",

                    border:
                      "none",
                  }}
                />
              ) : (
                <div className="preview-empty">
                  Preview will
                  appear here
                </div>
              )
            ) : (
              <textarea
                className="code-editor-textarea"
                value={
                  project?.code ||
                  ""
                }
                readOnly
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}