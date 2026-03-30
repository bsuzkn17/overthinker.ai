import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const reframe = searchParams.get("reframe") || "Daha dengeli dusun.";
        const trap = searchParams.get("trap") || "";
        const thought = searchParams.get("thought") || "";

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#0d0d1a",
                        fontFamily: "sans-serif",
                        padding: "72px",
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: "40px", fontWeight: 900, color: "#a78bfa" }}>
                            overthinker.ai
                        </span>
                    </div>

                    {/* Orta kısım */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "32px",
                            width: "100%",
                        }}
                    >
                        {/* Trap badge */}
                        {trap ? (
                            <div
                                style={{
                                    display: "flex",
                                    backgroundColor: "rgba(167,139,250,0.15)",
                                    border: "1px solid rgba(167,139,250,0.3)",
                                    borderRadius: "999px",
                                    padding: "8px 24px",
                                }}
                            >
                                <span style={{ fontSize: "24px", color: "#a78bfa", fontWeight: 600 }}>
                                    🧠 {trap}
                                </span>
                            </div>
                        ) : null}

                        {/* Orijinal düşünce */}
                        {thought ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    backgroundColor: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "24px",
                                    padding: "36px 48px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "20px",
                                        color: "rgba(255,255,255,0.4)",
                                        fontWeight: 600,
                                        letterSpacing: "2px",
                                        marginBottom: "12px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    ÖNCE
                                </span>
                                <span
                                    style={{
                                        fontSize: "32px",
                                        color: "rgba(255,255,255,0.6)",
                                        lineHeight: 1.5,
                                        fontStyle: "italic",
                                    }}
                                >
                                    {thought.slice(0, 120)}{thought.length > 120 ? "..." : ""}
                                </span>
                            </div>
                        ) : null}

                        {/* Ok */}
                        <div style={{ display: "flex", fontSize: "40px" }}>⬇️</div>

                        {/* Reframe */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                backgroundColor: "rgba(167,139,250,0.08)",
                                border: "1px solid rgba(167,139,250,0.25)",
                                borderRadius: "24px",
                                padding: "36px 48px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "20px",
                                    color: "rgba(167,139,250,0.6)",
                                    fontWeight: 600,
                                    letterSpacing: "2px",
                                    marginBottom: "12px",
                                    textTransform: "uppercase",
                                }}
                            >
                                SONRA
                            </span>
                            <span
                                style={{
                                    fontSize: "36px",
                                    fontWeight: 700,
                                    color: "#ffffff",
                                    lineHeight: 1.5,
                                }}
                            >
                                {reframe}
                            </span>
                        </div>
                    </div>

                    {/* Alt yazı */}
                    <div style={{ display: "flex" }}>
                        <span style={{ fontSize: "24px", color: "rgba(255,255,255,0.2)" }}>
                            Daha dengeli dusun ✦ overthinker.ai
                        </span>
                    </div>
                </div>
            ),
            { width: 1080, height: 1080 }
        );
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return new Response("Image failed: " + message, { status: 500 });
    }
}