import { useState } from 'react';
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { levels, calcularImc, Level} from './helpers/imc'
import { GridItem } from './components/GridItem'
import  leftarrowImage  from "./assets/leftarrow.png"

function App(){

  const [altura, setAltura] = useState<number>(0); //typeScript
  const [peso, setPeso] = useState<number>(0);
  const [toShow, setToShow] = useState< Level | null>(null);

  function calcularBotao(){
    if(altura && peso){ //Se não estiver vazio
      setToShow(calcularImc(altura, peso))
    }
    else{
      alert('Digite todos os campos!')
    }
  }

  function VoltarBotao(){
    setToShow(null);
    setAltura(0);
    setPeso(0);

  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number" 
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)' 
            value={altura > 0? altura: ''} 
            onChange={(evento) => {setAltura(parseFloat(evento.target.value))}} 
            disabled={toShow? true: false}
          />
          <input 
            type="number" 
            placeholder='Digite a seu peso. Ex: 75.4 (em kg)' 
            value={peso > 0? peso: ''} 
            onChange={(evento) => {setPeso(parseFloat(evento.target.value))}}  
            disabled={toShow? true: false}
          />

          <button onClick={calcularBotao} disabled={toShow? true: false}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toShow && 
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item}/>
            ))}
          </div>
          }

          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={VoltarBotao}>
                <img src={leftarrowImage} alt="" width="25px" />
              </div>
              <GridItem item={toShow}/>
            </div>
          }
      </div>
      </div>
    </div>
  )

}

export default App;