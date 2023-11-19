// import Canvas from '@/components/Canvas';
import dynamic from 'next/dynamic'
import Controls from '@/components/Controls'
import SplatCanvas from '@/components/SplatCanvas';
// import SplatCanvas from '@/components/SplatCanvas';
const NoSSR = dynamic(() => import('@/components/SplatCanvas'), { ssr: false })

interface HomeProps {
  splatUrl?: string
}
export default function Home({ splatUrl }: HomeProps) {
  const url: string = splatUrl || 'https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat';

  if (!url) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }
  const cameraParams = {
  }

  return (
    <>
      <main className="">
        <Controls />
        {/* <Canvas cameraParams={cameraParams} splatUrl={url} /> */}
        <SplatCanvas splatUrl={url} />
      </main>
    </>
  )
}
