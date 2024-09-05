export const chartData: any = {
    'type': 'line',
    'data': {
      'labels': [],
      'datasets': []
    },
    'options': {
      'elements': {
        'point': {
          'radius': 2,
          'hoverRadius': 5
        }
      },
      'scales': {
        'x': {
          'type': 'time',
          'time': {
            'parser': 'yyyy.MM.dd HH:mm',
            'tooltipFormat': 'MM HH:mm',
            'unit': 'day',
          },
          'scaleLabel': {
            'display': false,
            'labelString': 'Date',
            'fontColor': '#999999'
          },
          'ticks': {
            'autoSkip': true,
            'fontColor': '#999999'
          }
        },
        'y': {
          'ticks': {
            'autoSkip': true,
            'suggestedMin': 56944,
            'suggestedMax': 131584,
            'fontColor': '#999999'
          },
          'grid': {
            'drawOnChartArea': true,
            'color': '#363636',
            'drawTicks': false
          }
        }
      },
      'tooltips': {
        'intersect': true,
        'mode': "nearest"
      },
      'responsive': true,
      'title': {
        'display': false,
        'text': "Equity Curves"
      },
      'legend': {
        'labels': {
          'fontColor': "#999999"
        }
      },
      'plugins': {
        'zoom': {
          'pan': {
            'enabled': true,
            'mode': 'xy',
            'speed': 0.1,
            'drag': true
          },
          'zoom': {
            'enabled': true,
            'drag': true,
            'mode': 'xy',
            'speed': 0.1
          }
        }
      }
    }
  }

  