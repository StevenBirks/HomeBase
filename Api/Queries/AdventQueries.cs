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
                AdventDay = new AdventDayDto { Year = 2015, Day = 1 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 2 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 3 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 4 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 5 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 6 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 7 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 8 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 9 }
            });            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 10 }
            });
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
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 12 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 13 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2015, Day = 14 }
            });            
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 15 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 16 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 17 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 18 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 19 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 20 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 21 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 22 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 23 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 24 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2015, Day = 25 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 1 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 2 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 3 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 4 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 5 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 6 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 7 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 8 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = false,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 9 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 10 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 11 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 12 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 13 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 14 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 15 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 16 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 17 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2018, Day = 18 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = true,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2018, Day = 19 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2018, Day = 20 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2018, Day = 21 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2018, Day = 22 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2018, Day = 23 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2018, Day = 24 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2018, Day = 25 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 1 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 2 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 3 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 4 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 5 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 6 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 7 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = 2019, Day = 8 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 9 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 10 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 11 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 12 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 13 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 14 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 15 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 16 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 17 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 18 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 19 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 20 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 21 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 22 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 23 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 24 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false,
                AdventDay = new AdventDayDto { Year = 2019, Day = 25 }
            });
            adventDaysDto = adventDaysDto.Where(o => o.AdventDay.Year == year).ToList();

            return adventDaysDto;
        }
    }
}