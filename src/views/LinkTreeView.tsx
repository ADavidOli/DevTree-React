import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { social } from '../data/social'
import DevTreeInput from '../components/DevTreeInput'
import { isValidUrl } from '../utils/idex'
import { toast } from 'sonner'
import { updateUser } from '../api/DevTreeAPI'
import type { User, socialNetwork } from '../types'

const LinkTreeView = () => {

  const [devTreeLinks, setDevTreeLinks] = useState(social)


  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>(['user'])!;

  // agregando mutation.
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('actualizado correctamente')
    }
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map(item => {
      const userLink = JSON.parse(user.links).find((link: socialNetwork) => link.name === item.name);
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled }
      }
      return item;
    })
    setDevTreeLinks(updatedData);
  }, [])


  // const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
  //   setDevTreeLinks(updatedLinks)
  // }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const updateLinks = devTreeLinks.map(link => {
      if (link.name === name) {
        return {
          ...link,
          url: value,
          enabled: isValidUrl(value)
        };
      }
      return link;
    });

    setDevTreeLinks(updateLinks);

    const currentLinks: socialNetwork[] = JSON.parse(user.links);

    const updatedItems = updateLinks
      .filter(link => isValidUrl(link.url)) 
      .map(link => {
        const existing = currentLinks.find(l => l.name === link.name);

        return {
          ...link,
          id: existing?.id ?? 0,
          enabled: true
        };
      });

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
      };
    });
  };

  const links: socialNetwork[] = JSON.parse(user.links);

  const handleEnabledLink = (socialNetwork: string) => {
    const updatedLink = devTreeLinks.map(link => {
      if (link.name === socialNetwork) {
        if (!isValidUrl(link.url)) {
          toast.error('URL no válida');
          return {
            ...link,
            enabled: false
          };
        }

        return {
          ...link,
          enabled: !link.enabled
        };
      }

      return link;
    });

    setDevTreeLinks(updatedLink);
    let updatedItems: Array<socialNetwork> = [];

    const SelectSocialNetWork = updatedLink.find(link => link.name === socialNetwork);

    if (SelectSocialNetWork?.enabled) {
      // saber que select fue seleccionado
      console.log(SelectSocialNetWork);
      const id = links.filter(link => link.id > 0).length + 1;

      // en caso de registros duplicados
      if (links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id: id
            }
          } else {
            return link;
          }
        })
      } else {
        const newItem = {
          ...SelectSocialNetWork,
          id: id
        }
        updatedItems = [...links, newItem];
      }

    } else {
      // identificamos el indice en el arreglo
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork);
      updatedItems = links.map(link => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          }
        } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
          return {
            ...link,
            id: link.id - 1
          }
        } else {
          return link
        }

      })

    }

    // almacena en la base de datos
    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
      }
    })
  }


  return (
    <>
      <div className='space-y-5'>
        {devTreeLinks.map(item => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnabledLink={handleEnabledLink}
          />
        ))}
        <button
          className='bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold'
          onClick={() => mutate(queryClient.getQueryData(['user'])!)}
        >Guardar Cambios</button>
      </div>
    </>
  )
}

export default LinkTreeView