import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const thought = searchParams.get('thought') || "";
    const reframe = searchParams.get('reframe') || "";

    return new ImageResponse(
        (
            <div style={{
                height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d0d1a', padding: '80px',
            }}>
                <div style={{ color: 'white', fontSize: 70, fontWeight: 'bold', marginBottom: 60, fontStyle: 'italic' }}>
                    overthinker<span style={{ color: '#8b5cf6' }}>.ai</span>
                </div>
                <div style={{
                    display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: 60, padding: '80px', width: '100%', border: '2px solid rgba(139, 92, 246, 0.3)'
                }}>
                    <div style={{ color: '#6b7280', fontSize: 30, marginBottom: 25, fontWeight: 'bold' }}>ZİHİNDEKİ SES</div>
                    <div style={{ color: '#9ca3af', fontSize: 38, marginBottom: 60, fontStyle: 'italic' }}>"{thought}"</div>
                    <div style={{ color: '#a78bfa', fontSize: 30, marginBottom: 25, fontWeight: 'bold' }}>NETLEŞMİŞ BAKIŞ</div>
                    <div style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>{reframe}</div>
                </div>
                <div style={{ marginTop: 80, color: '#8b5cf6', fontSize: 40, fontWeight: 'bold' }}>www.overthinker.ai</div>
            </div>
        ),
        { width: 1080, height: 1920 }
    );
}