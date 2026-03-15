import React, { useState, useCallback } from 'react';
import { Container, Draggable } from '@mekanysmos/react-smooth-dnd';
import { DropResult } from './utils';

interface ChessPiece {
  type?: string;
  side?: string;
  data?: number;
  hover?: boolean;
}

const ChessBoard: React.FC = () => {
	const getFirstPieceRow = (side: string): ChessPiece[] => {
		return [
			{ type: 'rook', side, data: 9816 },
			{ type: 'knight', side, data: 9814 },
			{ type: 'bishop', side, data: 9815 },
			{ type: 'queen', side, data: 9813 },
			{ type: 'king', side, data: 9812 },
			{ type: 'bishop', side, data: 9815 },
			{ type: 'knight', side, data: 9814 },
			{ type: 'rook', side, data: 9816 },
		];
	};

	const getSecondPieceRow = (side: string): ChessPiece[] => {
		return [
			{ type: 'pawn', side, data: 9817 },
			{ type: 'pawn', side, data: 9817 },
			{ type: 'pawn', side, data: 9817 },
			{ type: 'pawn', side, data: 9817 },
			{ type: 'pawn', side, data: 9817 },
			{ type: 'pawn', side, data: 9817 },
			{ type: 'pawn', side, data: 9817 },
			{ type: 'pawn', side, data: 9817 },
		];
	};

	const initBoard = (): ChessPiece[][] => {
		const board: ChessPiece[][] = [];
		for (let i = 0; i < 8; i++) {
			if (i === 0) {
				board.push(getFirstPieceRow('black'));
			} else if (i === 1) {
				board.push(getSecondPieceRow('black'));
			} else if (i === 6) {
				board.push(getSecondPieceRow('white'));
			} else if (i === 7) {
				board.push(getFirstPieceRow('white'));
			} else {
				board.push([{}, {}, {}, {}, {}, {}, {}, {}]);
			}
		}
		return board;
	};

	const [board, setBoard] = useState<ChessPiece[][]>(initBoard);
	const [, forceRender] = useState(0);

	const renderPiece = (piece: ChessPiece) => {
		if (piece.side) {
			const htmlcode = `&#${piece.data! + (piece.side === 'black' ? 6 : 0)};`;
			const hover = piece.hover ? ' hover' : '';
			return (
				<Draggable>
					<div className={`piece${hover} ${piece.side}`}>
						<span dangerouslySetInnerHTML={{ __html: htmlcode }}></span>
					</div>
				</Draggable>
			);
		} else {
			return null;
		}
	};

	const shouldAcceptDrop = (payload: any, rowIndex: number, colIndex: number) => {
		const { colIndex: fromCol, rowIndex: fromRow } = payload;
		const fromPiece = board[fromRow][fromCol];
		const piece = board[rowIndex][colIndex];

		if (fromPiece === piece) return true;
		if (fromPiece.side === piece.side) return false;

		return true;
	};

	const onDrop = (dropResult: DropResult, rowIndex: number, colIndex: number) => {
		const { addedIndex, removedIndex, payload } = dropResult;

		if (addedIndex !== null || removedIndex !== null) {
			if (removedIndex !== null) {
				board[rowIndex][colIndex] = {};
			}

			if (addedIndex !== null) {
				board[rowIndex][colIndex] = payload.piece;
			}

			forceRender(n => n + 1);
		}
	};

	const onDragEnter = (row: number, col: number) => {
		board[row][col].hover = true;
		forceRender(n => n + 1);
	};

	const onDragLeave = (row: number, col: number) => {
		board[row][col].hover = false;
		forceRender(n => n + 1);
	};

	return (
		<div className="board">
			{board.map((row, rowIndex) => {
				return (
					<div className="row" key={rowIndex}>
						{row.map((piece, colIndex) => {

							return (
								<div className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'white' : 'black'}`} key={`${rowIndex}${colIndex}`}>
									<Container
										style={{ height: '100%' }}
										behaviour="drop-zone"
										onDrop={(result: DropResult) => onDrop(result, rowIndex, colIndex)}
										shouldAcceptDrop={(_: any, payload: any) => shouldAcceptDrop(payload, rowIndex, colIndex)}
										getChildPayload={() => ({ colIndex, rowIndex, piece })}
										onDragEnter={() => onDragEnter(rowIndex, colIndex)}
										onDragLeave={() => onDragLeave(rowIndex, colIndex)}
									>
										{renderPiece(piece)}
									</Container>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default ChessBoard;
