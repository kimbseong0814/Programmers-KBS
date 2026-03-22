import { useTypedSelector } from './hooks/redux'
import { appContainer, board, buttons } from './App.css'

function App() {
  const logger = useTypedSelector((state) => state.logger)

  return (
    <div className={appContainer}>
      <div className={board}>
        <p>{JSON.stringify(logger)}</p>
      </div>

      <div className={buttons}>
        <button>이 게시판 삭제하기</button>
        <button>버튼</button>
      </div>
    </div>
  )
}

export default App