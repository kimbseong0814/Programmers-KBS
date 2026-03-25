import { useTypedDispatch, useTypedSelector } from './hooks/redux'
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from './App.css'
import { useState } from 'react'
import BoardList from './components/BoardList/BoardList';
import ListsComtainer from './components/ListsComtainer/ListsComtainer';
import EditModal from './components/EditModal/EditModal';
import LoggerModal from './components/LoggerModal/LoggerModal';
import { deleteBoard } from './store/slices/boardsSlices';
import { v4 } from 'uuid';
import { addLog } from './store/slices/loggerSlices';

function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const logger = useTypedSelector((state) => state.logger);
  const modalActive = useTypedSelector(state => state.boards.modalActive);
  const boards = useTypedSelector(state => state.boards.boardArray);

  const [activeBoardId, setActiveBoardId] = useState('board-0');

  const getActiveBoard = boards.filter(board => board.boardId === activeBoardId)[0];
  const lists = getActiveBoard?.lists || [];


  const handleDeleteBoard = () => {
  if(boards.length > 1) {
    dispatch(
      deleteBoard({boardId: getActiveBoard.boardId})
    )

    dispatch(
      addLog({
        logId: v4(),
        logMessage: `게시판 지우기: ${getActiveBoard.boardName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )

    const newIndexToSet = () => {
      const indexToDeleted = boards.findIndex (
        board => board.boardId === activeBoardId
      )

      return indexToDeleted === 0
        ? indexToDeleted + 1
        : indexToDeleted - 1;
    }
    setActiveBoardId(boards[newIndexToSet()].boardId)
    

  } else {
    alert('최소 게시판 개수는 한 개입니다.');
  }
}

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen}/> : null}
      {modalActive ? <EditModal />: null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsComtainer lists={lists} boardId={getActiveBoard?.boardId || ''} />
        <p>{logger.logArray.length}</p>
      </div>

      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
          </button>
        <button className={loggerButton} onClick={() => setIsLoggerOpen(!isLoggerOpen)}>
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  )
}

export default App