import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls'
import SplatCanvas from '@/components/SplatCanvas';

interface HomeProps {
  splatUrl?: string
}
export default function Home({ splatUrl }: HomeProps) {
  const url: string = splatUrl || 'https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat';

  if (!url) {
    return <div>Loading...</div>;
  }
  const cameraParams = {

  }

  return (
    <>
      <main className="">
        {/* <Controls /> */}
        {/* <Canvas cameraParams={cameraParams} splatUrl={url} /> */}
        <SplatCanvas splatUrl={url} />
      </main>
    </>
  )
}
