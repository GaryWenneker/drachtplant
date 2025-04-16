import { IActions, IState } from './state/actions'
import React, { FC, useEffect, useState } from 'react'

import Card from './components/Card'
import Header from './components/Header'
import Jumbotron from './components/Jumbo'
import Layout from './components/structure/layout.component'
import ListComponent from './components/list.component'
import PlantCard from './components/tiles/plant.card.tile.component'
import PlantCardTileGridComponent from './components/tiles/plant.card.tile.grid.component'
import RowComponent from './components/structure/row.component'
import Screen from './components/structure/layout.component'
import SectionComponent from './components/structure/section.component'
import TileComponent from './components/listitems/tile.component'
import logo from './logo.svg'
import { supabase } from './services/supabaseClient';
import { useReactHookz } from './state'
import useSupabaseService from './services/useSupabaseService';

type Props = {}

export const App: FC<Props> = () => {

  const [, actions]: [IState, IActions] = useReactHookz();
  const [count, setCount] = useState<number>(0)
  const [netlify, setNetlify] = useState<string | undefined>(undefined)
  const [input, setInput] = useState<string>('')

  const handleInput = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') fetchFromNetlify(input)
  }

  useEffect(() => {
    actions.getData(20)
  }, [])
    

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value)
  }

  const fetchFromNetlify = (name?: string): void => {
    const endpoint: string = '/api/hello-world' + (name ? '?name=' + name : '')
    fetch(endpoint)
      .then(
        (res: any) => {
          res.json().then((res: any) => setNetlify(res.message))
        }
      )
  }

  return (
    <>
      <Header />
      <Layout>
        <SectionComponent>
          <PlantCardTileGridComponent />
        </SectionComponent>
      </Layout>
    </>
  )
}