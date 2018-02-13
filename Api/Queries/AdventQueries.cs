using System.Collections.Generic;
using System.Linq;
using Api.Models;

namespace Api.Queries
{
    public class AdventQueries : IAdventQueries
    {
        public ICollection<AdventStatusDto> GetAdventStatuses(int year)
        {
            var adventDaysDto = new List<AdventStatusDto>();

            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 11 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = false,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 12 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 13 }
            });

            adventDaysDto = adventDaysDto.Where(o => o.AdventDay.Year == year).ToList();

            return adventDaysDto;
        }
    }
}