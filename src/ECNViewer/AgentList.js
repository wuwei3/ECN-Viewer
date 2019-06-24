import React from 'react'
import ReactJson from 'react-json-view'

import { List, ListItem, ListSubheader, ListItemAvatar, Chip, Avatar, ListItemText, Modal, Paper, Typography } from '@material-ui/core'

import MoreIcon from '@material-ui/icons/MoreVert'
import MemoryIcon from '@material-ui/icons/Memory'
import CloseIcon from '@material-ui/icons/Close'

import { makeStyles } from '@material-ui/styles'

import { statusColor, msvcStatusColor } from './utils'

const useStyles = makeStyles({
  avatarList: {
    color: 'white',
    backgroundColor: 'var(--statusColor, white)',
    boxShadow: '0px 2px 2px #444'
  },
  msvcChipList: {
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    flex: '1',
    paddingRight: '15px'
  },
  msvcChip: {
    marginTop: 'var(--mTop, 0px)',
    backgroundColor: 'var(--color, #5064EC)',
    fontSize: '10px',
    borderRadius: '5px',
    height: '20px',
    margin: '2px',
    width: '100px',
    color: 'white',
    '& .MuiChip-label': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'block'
    }
  },
  jsonDisplay: {
    width: '99%',
    minHeight: '30rem',
    fontFamily: '"Lucida Console", Monaco, monospace',
    fontSize: '0.8rem',
    lineHeight: '1.2'
  },
  modalTitle: {
    backgroundColor: '#002E43',
    color: 'white',
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  modal: {
    width: '60%',
    top: '15%',
    left: '20%',
    position: 'absolute'
  },
  modalContent: {
    maxHeight: '600px',
    overflowY: 'scroll'
  },
  listTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  link: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

export default function AgentList (props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { msvcsPerAgent, agents, agent, setAgent, setAutozoom } = props

  return (
    <React.Fragment>
      <List
        subheader={
          <ListSubheader component='div' id='agent-list-subheader' style={{ position: 'relative' }}>
            <div className={classes.listTitle}>
              <div>Agents - <small>{agents.length} nodes</small></div>
              <div><small className={classes.link} onClick={() => setAutozoom(true)}>See all ECN</small></div>
            </div>
          </ListSubheader>
        }
      >
        {agents.map(a => {
          const msvcs = msvcsPerAgent[a.uuid] || []
          return (
            <ListItem button key={a.uuid} onClick={() => setAgent(a)} selected={a.uuid === agent.uuid}>
              <ListItemAvatar>
                <Avatar style={{ '--statusColor': statusColor[a.daemonStatus] }} className={classes.avatarList}>
                  <MemoryIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={a.name} secondary={`${msvcs.length} Microservices`} />
              <div className={classes.msvcChipList}>
                {msvcs.map((m, idx) => (
                  <React.Fragment key={m.uuid}>
                    <Chip
                      size='small'
                      label={m.name}
                      style={{
                        '--mTop': idx ? '2px' : '0px',
                        '--color': msvcStatusColor[a.daemonStatus]
                      }}
                      className={classes.msvcChip}
                      title={m.name}
                    />
                  </React.Fragment>
                ))}
              </div>
              <MoreIcon onClick={() => setOpen(true)} />
            </ListItem>
          )
        })}
      </List>
      <Modal
        aria-labelledby='agent details'
        open={open}
        onClose={() => setOpen(false)}
      >
        <Paper className={classes.modal}>
          <div className={classes.modalTitle}>
            <Typography variant='h5'>{agent.name} details</Typography>
            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setOpen(false)} />
          </div>
          <div className={classes.modalContent}>
            <ReactJson src={agent} name={false} />
          </div>
        </Paper>
      </Modal>
    </React.Fragment>
  )
}
