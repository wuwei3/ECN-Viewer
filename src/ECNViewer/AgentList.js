import React from 'react'

import { List, ListItem, ListSubheader, ListItemAvatar, Chip, Avatar, ListItemText, Modal, Paper, Typography } from '@material-ui/core'

import MoreIcon from '@material-ui/icons/MoreVert'
import MemoryIcon from '@material-ui/icons/Memory'

import { makeStyles } from '@material-ui/styles'
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
    padding: '5px'
  },
  modal: {
    width: '60%',
    top: '20%',
    left: '20%',
    position: 'absolute'
  }
})

const statusColor = {
  'RUNNING': '#00C0A9',
  'UNKNOWN': '#ACB5C6',
  'OFFLINE': '#FF585D'
}

export default function AgentList (props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { msvcsPerAgent, agents, agent, setAgent, centerMap } = props
  const selectAgent = (a) => {
    setAgent(a)
    centerMap([a.latitude, a.longitude])
  }
  return (
    <React.Fragment>
      <List
        subheader={
          <ListSubheader component='div' id='agent-list-subheader' style={{ position: 'relative' }}>
            Agents - <small>{agents.length} nodes</small>
          </ListSubheader>
        }
      >
        {agents.map(a => {
          const msvcs = msvcsPerAgent[a.uuid] || []
          return (
            <ListItem button key={a.uuid} onClick={() => selectAgent(a)} selected={a.uuid === agent.uuid}>
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
                        '--mTop': idx ? '2px' : '0px'
                      }}
                      className={classes.msvcChip}
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
          <Typography variant='h5' className={classes.modalTitle}>{agent.name} details</Typography>
          <textarea className={classes.jsonDisplay}>
            {JSON.stringify(agent, null, 4)}
          </textarea>
        </Paper>
      </Modal>
    </React.Fragment>
  )
}
