import { useEffect, useState } from 'react';
import * as C from './App.styles'

import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'

import { InfoItem } from './components/InfoItem';
import { Button } from  './components/Button';

import { GridItemType } from './types/GridItemType';
import { Items } from './data/Items'
import { GridItem } from './components/GridItem';

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), [])

  const resetAndCreateGrid = () => {
    // step 1 - reset game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
     
    // step 2 - create grid
    // 2.1 - create a empty grid
    let tmpGrid: GridItemType[] = [];
    for(let i = 0; i < (Items.length * 2); i++) {
      tmpGrid.push({
        item: null, shown: false, permanentShown: false
      });
    }
    // 2.2- fill the grid
    for(let m = 0; m < 2; m++) {
      for(let n = 0; n < Items.length; n++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (Items.length * 2));
        }
        tmpGrid[pos].item = n;       
      }
    }
    // 2.3 - put on state
    setGridItems(tmpGrid);

    // step 3 - start game
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {

  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={logoImage} width='200' alt="" />
        </C.LogoLink>
          
        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00' />
          <InfoItem label='Movimentos' value='0' />
        </C.InfoArea>

        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;