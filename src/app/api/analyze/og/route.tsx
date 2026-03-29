import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const encodedThought = searchParams.get("thought") || "";
        const encodedReframe = searchParams.get("reframe") || "";

        const thought = encodedThought
            ? decodeURIComponent(escape(atob(encodedThought)))
            : "";
        const reframe = encodedReframe
            ? decodeURIComponent(escape(atob(encodedReframe)))
            : "Analiz bekleniyor...";

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
                        padding: "80px",
                    }}
                >
                    {/* Üst logo */}
                    <div
                        style={{
                            display: "flex",
                            marginBottom: "60px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "56px",
                                fontWeight: 900,
                                fontStyle: "italic",
                                color: "#a78bfa",
                                fontFamily: "sans-serif",
                            }}
                        >
                            overthinker.ai
                        </span>
                    </div>

                    {/* Reframe kutusu */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(167, 139, 250, 0.1)",
                            padding: "60px",
                            width: "100%",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "44px",
                                fontWeight: 700,
                                color: "#ffffff",
                                textAlign: "center",
                                lineHeight: 1.4,
                                fontFamily: "sans-serif",
                            }}
                        >
                            {reframe}
                        </span>
                    </div>

                    {/* Alt etiket */}
                    <div
                        style={{
                            display: "flex",
                            marginTop: "48px",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "28px",
                                color: "rgba(255,255,255,0.3)",
                                fontFamily: "sans-serif",
                            }}
                        >
                            Daha dengeli dusun
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
        console.error("OG Image Error:", message);
        return new Response("Gorsel olusturulamadi: " + message, { status: 500 });
    }
}