export function SetTeamColor(team) {
    switch (team) {
      case 'Mobile':
        return '#A8B557'
      case 'Frontend':
        return '#3F8C90'
      case 'Backend':
        return '#BF6D53'
      default:
        return '#9D4949'
    }
  }