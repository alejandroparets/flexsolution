import { useCallback, useRef, useState } from 'react';
import { Circle, Download, Loader2, Video } from 'lucide-react';

const TOTAL_DURATION_MS = 3000 + 4500 + 5000 + 4000 + 4000; // 20500ms

type State = 'idle' | 'waiting' | 'recording' | 'processing' | 'done';

export function RecordButton({ onStartRecording }: { onStartRecording?: () => void }) {
  const [state, setState] = useState<State>('idle');
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(async () => {
    try {
      setState('waiting');
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: false,
        // @ts-expect-error – non-standard but widely supported
        preferCurrentTab: true,
      });

      setState('recording');
      onStartRecording?.();

      chunksRef.current = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const mr = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        setState('processing');
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
        setState('done');
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      };

      mr.start(200);

      // Auto-stop after full animation + 500ms buffer
      const start = performance.now();
      intervalRef.current = window.setInterval(() => {
        const elapsed = performance.now() - start;
        setProgress(Math.min(1, elapsed / TOTAL_DURATION_MS));
        if (elapsed >= TOTAL_DURATION_MS + 500) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          if (mr.state === 'recording') mr.stop();
        }
      }, 100);

      // Also stop if user stops screen share manually
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        if (mr.state === 'recording') mr.stop();
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      });
    } catch (err) {
      console.error(err);
      setState('idle');
    }
  }, [onStartRecording]);

  const stopEarly = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const reset = useCallback(() => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
    setProgress(0);
    setState('idle');
  }, [downloadUrl]);

  const secondsLeft = Math.max(0, Math.ceil(((1 - progress) * TOTAL_DURATION_MS) / 1000));

  if (state === 'done' && downloadUrl) {
    return (
      <div className="flex items-center gap-2">
        <a
          href={downloadUrl}
          download="flexsolution-tiktok.webm"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Descargar vídeo
        </a>
        <button
          onClick={reset}
          className="text-white/60 hover:text-white text-xs underline px-2"
        >
          Nueva grabación
        </button>
      </div>
    );
  }

  if (state === 'recording') {
    const circumference = 2 * Math.PI * 10;
    return (
      <div className="flex items-center gap-3">
        {/* Circular progress */}
        <div className="relative w-10 h-10">
          <svg className="w-10 h-10 -rotate-90" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
            <circle
              cx="12" cy="12" r="10" fill="none" stroke="#ef4444" strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="transition-all duration-100"
            />
          </svg>
          <Circle className="absolute inset-0 m-auto w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
        </div>
        <div className="text-white text-sm font-mono">{secondsLeft}s</div>
        <button
          onClick={stopEarly}
          className="text-white/60 hover:text-white text-xs border border-white/20 rounded px-2 py-1"
        >
          Parar
        </button>
      </div>
    );
  }

  if (state === 'waiting' || state === 'processing') {
    return (
      <div className="flex items-center gap-2 text-white/70 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        {state === 'waiting' ? 'Selecciona esta pestaña…' : 'Procesando…'}
      </div>
    );
  }

  return (
    <button
      onClick={start}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
      title="Graba el vídeo para subirlo a TikTok"
    >
      <Video className="w-4 h-4" />
      Grabar para TikTok
    </button>
  );
}
