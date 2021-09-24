export function SetTeamColor(team) {
    switch (team) {
      case 'Mobile':
        return '#F8FFCB'
      case 'Frontend':
        return '#CBE3FF'
      case 'Backend':
        return '#D2FFCB'
      default:
        return '#FAD9FF'
    }
  }