export function SetTeamColor(team) {
    switch (team) {
      case 'Mobile':
        return '#ccd5ae'
      case 'Frontend':
        return '#e9edc9'
      case 'Backend':
        return '#fefae0'
      default:
        return '#faedcd'
    }
  }