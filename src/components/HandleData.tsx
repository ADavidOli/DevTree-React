import type { socialNetwork, UserHandle } from "../types"

type HandleDataProps = {
  data: UserHandle
}

const HandleData = ({ data }: HandleDataProps) => {
  const links: socialNetwork[] = JSON.parse(data.links).filter((link: socialNetwork) => link.enabled);

  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl text-center">{data.handle}</p>
      {data.image && <img src={data.image} className="max-w-[250px] mx-auto"></img>}
      <p className="text-lg text-center text-center font-bold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ?
          links.map((link) => (
            <a href={link.url}
              key={link.name}
              target="_blank"
              rel="noreferrer nooperer" 
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
              <img src={`/social/icon_${link.name}.svg`} alt="imagen red social" className="w-12" />
              <p className="text-black capitalize font-bold text-lg">Visita mi: {link.name}</p>    
            </a>
          ))
          : <p className="text-center">No hay enlaces por mostrar</p>}
      </div>
    </div>
  )
}

export default HandleData