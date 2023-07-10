 

import axios from 'axios'
import Image from 'next/image'   
//import Pocketbase from 'pocketbase'

export default async function Home() {
  
  const getHeroes = async () => {
    const endpoint = {
    method: 'GET',
    url: 'https://api.opendota.com/api/heroes',
     
  }

    try {
      const enumerateHeroes = await axios.request(endpoint)
      //console.log(enumerateHeroes)
      
      return enumerateHeroes?.data as any[]
    } catch (error) {
      console.log(error)
    }

  }

  async function addNameLoc() {
    const heroes = await fetch('http://127.0.0.1:8090/api/collections/dota2heroes/records?page=1&perPage=300', { 'cache': 'no-cache'})

    const data = await heroes.json()
 
    const data2 = data.items as any[]
    
    await Promise.all(
      data2?.map( async(hero) => {
        console.log(hero.id) 
        const trimmedName = hero.name
          .replace("npc_dota_hero_", "")
          .split("_")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        console.log(trimmedName) 
  
  
        try {
          const response = await fetch(`http://127.0.0.1:8090/api/collections/dota2heroes/records/${hero.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              
            },    
            body: JSON.stringify({name_loc: trimmedName}),
          });
  
          if (!response.ok) {
            console.log(`Failed to save hero: ${trimmedName}`);
          }
        } catch (error) {
          console.error(`Error occurred while saving hero: ${trimmedName}`);
        } 
  
  
  
      })

    )

   
  }
  
  //addNameLoc()
   
  

  const enlistHeroes = async () => {
     
     

    const heroes = await getHeroes()

    const list2: any[] = []

    heroes?.forEach((element, i) => {
      const getName = element.localized_name
      const image = getName.toLowerCase().replace(/\s/g,'_')  
      const attributes = ["strength", "agility", "intelligence", "universal"]

      let attribute = ''

      if (element.primary_attr == 'str') {
        attribute = attributes[0]
      } else if (element.primary_attr == 'agi') {
        attribute = attributes[1]
      } else if (element.primary_attr == 'int') {
        attribute = attributes[2] 
      } else  {
        attribute = attributes[3] 
      }


      list2.push({
        "name": element.name,
        "name_loc": element.localized_name,
        "primary_attr": element.primary_attr,
        "complexity": 1,
        "image":`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${image}.png`,
        "attribute_img": `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${attribute}.png`
        
      })
    });

 

    return list2 as any[] 
     
  }

  const allHeroes = await enlistHeroes()

  async function saveToPocketBase(thelist:any) { 
   

      await Promise.all(
        thelist.map(async (hero:any) => {

          const getName = hero.name_loc  
          const image = getName.toLowerCase().replace(/\s/g,'_')  
          const attributes = ["strength", "agility", "intelligence", "universal"]

          let attribute = ''

          if (hero.primary_attr == 'str') {
            attribute = attributes[0]
          } else if (hero.primary_attr == 'agi') {
            attribute = attributes[1]
          } else if (hero.primary_attr == 'int') {
            attribute = attributes[2] 
          } else  {
            attribute = attributes[3] 
          }

          const sendBody = {
            
              'name': hero.name,
              'name_loc': hero.localized_name,
              'primary_attr': hero.primary_attr,
              'complexity': 1,
              'image':`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${image}.png`,
              'attribute_img': `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${attribute}.png` 
          }

          //console.log(sendBody) 

          try {
            const response = await fetch("http://127.0.0.1:8090/api/collections/dota2heroes/records", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendBody),
            });
    
            if (!response.ok) {
              console.log(`Failed to save hero: ${hero.localized_name}`);
            }
          } catch (error) {
            console.error(`Error occurred while saving hero: ${hero.localized_name}`);
          }
      })) 
  }

  //saveToPocketBase(allHeroes)

  async function renderHeroes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/dota2heroes/records?page=1&perPage=300', { cache: 'no-cache'} )
    const data = await res.json()
    return data?.items as any[]
  }

  const heroList = await renderHeroes() 
   
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div>
        { 
          heroList?.map((hero) => {
            return <>
              <div>{hero.name_loc}({hero.primary_attr})</div>
              <Image width={20} height={20} src={hero.attribute_img} alt={hero.name} />
             
              <Image width={300} height={300} src={hero.image} alt={hero.name}  />
              
              <br />
              
            </>
          })

        }
        
      </div>
    </main>
  )
}
