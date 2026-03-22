import { combineReducers } from '@reduxjs/toolkit'
import { loggerReducer } from '../slices/loggerSlices'
import { boardsReducer } from '../slices/boardsSlices'

const reducer = combineReducers({
  logger: loggerReducer,
  boards: boardsReducer
})

export default reducer