import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import './Task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Task = ({
	label,
	onDeletedTask,
	done,
	onCheckedTask,
	editTask,
	edit,
	editLabel,
	createDate,
	onTimerStart,
	onTimerStop,
	min,
	sec,
}) => {
	const [newLabel, setNewLabel] = useState('')
	const [labelId, setLabelId] = useState('')
	Task.defaultProps = {
		onCheckedTask: () => {},
		onDeletedTask: () => {},
	}

	Task.propTypes = {
		label: PropTypes.string,
		onDeletedTask: PropTypes.func,
		done: PropTypes.bool,
		onCheckedTask: PropTypes.func,
	}

	const handleClick = (e) => {
		e.stopPropagation()
		editTask()
	}

	const handleEdit = (event) => {
		event.preventDefault()
		editLabel(newLabel)
		editTask()
	}

	const handleChange = (e) => {
		setNewLabel(e.target.value)
	}

	useEffect(() => {
		setLabelId(nanoid())
	}, [])
	var result = formatDistanceToNow(createDate, { includeSeconds: true })

	return (
		<li className={done ? 'completed' : edit ? 'editing' : null}>
			<div className="view">
				<input id={labelId} className="toggle" type="checkbox" checked={done} readOnly onClick={onCheckedTask} />
				<label htmlFor={labelId}>
					<span className="title">{label}</span>
					<span className={min.length !== 0 && sec.length !== 0 ? 'description' : 'description-hidden'}>
						<button className="icon icon-play" onClick={onTimerStart}></button>
						<button className="icon icon-pause" onClick={onTimerStop}></button>
						<p className="time-task">
							{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
						</p>
					</span>
					<span className="description">created {result} ago</span>
				</label>
				<button className="icon icon-edit" onClick={handleClick}></button>
				<button className="icon icon-destroy" onClick={onDeletedTask}></button>
			</div>
			{edit && (
				<form onSubmit={handleEdit}>
					<input type="text" className="edit" defaultValue={label} onChange={handleChange} />
				</form>
			)}
		</li>
	)
}

export default Task
