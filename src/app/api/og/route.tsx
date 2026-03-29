import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const reframe = searchParams.get("reframe") || "Daha dengeli dusun.";
        const trap = searchParams.get("trap") || "";

        return new ImageResponse(
            (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#0d0d1a",
                        fontFamily: "sans-serif",
                    }}
                >
                    {/* Arka plan glow */}
                    <div
                        style={{
                            position: "absolute",
                            top: "-10%",
                            left: "-10%",
                            width: "60%",
                            height: "60%",
                            background: "rgba(139,92,246,0.2)",
                            borderRadius: "50%",
                            filter: "blur(80px)",
                            display: "flex",
                        }}
                    />

                    {/* Logo */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "48px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "52px",
                                fontWeight: 900,
                                color: "#a78bfa",
                                letterSpacing: "-2px",
                            }}
                        >
                            overthinker.ai
                        </span>
                    </div>

                    {/* Trap badge */}
                    {trap ? (
                        <div
                            style={{
                                display: "flex",
                                marginBottom: "32px",
                                backgroundColor: "rgba(167,139,250,0.15)",
                                border: "1px solid rgba(167,139,250,0.3)",
                                borderRadius: "999px",
                                padding: "10px 28px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "28px",
                                    color: "#a78bfa",
                                    fontWeight: 600,
                                }}
                            >
                                {trap}
                            </span>
                        </div>
                    ) : null}

                    {/* Reframe kutusu */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(167,139,250,0.08)",
                            border: "1px solid rgba(167,139,250,0.2)",
                            borderRadius: "32px",
                            padding: "56px 72px",
                            maxWidth: "860px",
                            margin: "0 auto",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "42px",
                                fontWeight: 700,
                                color: "#ffffff",
                                textAlign: "center",
                                lineHeight: 1.5,
                            }}
                        >
                            {reframe}
                        </span>
                    </div>

                    {/* Alt yazı */}
                    <div
                        style={{
                            display: "flex",
                            marginTop: "48px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "26px",
                                color: "rgba(255,255,255,0.25)",
                            }}
                        >
                            Daha dengeli dusun ✦ overthinker.ai
                        </span>
                    </div>
                </div>
            ),
            {
                width: 1080,
                height: 1080,
            }
        );
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        console.error("OG Error:", message);
        return new Response("Image generation failed: " + message, { status: 500 });
    }
}