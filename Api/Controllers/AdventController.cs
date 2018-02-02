using Microsoft.AspNetCore.Mvc;
using Api.Models;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class AdventController : Controller
    {
        // private readonly IBacklogQueries _backlogQueries;

        public AdventController(
            // IBacklogQueries backlogQueries
        )
        {
            // _backlogQueries = backlogQueries ?? throw new ArgumentNullException(nameof(backlogQueries));
        }

        [HttpGet("advent-statuses", Name = "GetAdventStatuses")]
        public IActionResult Get([FromQuery(Name = "year")]int year)
        {
            var adventDaysDto = new List<AdventStatusDto>();

            adventDaysDto.Add(new AdventStatusDto {
                CompletedP1 = false,
                CompletedP2 = false,
                StartedP1 = false,
                StartedP2 = false, 
                AdventDay = new AdventDayDto {
                    Year = year,
                    Day = 1
                }
            });

            return Ok(adventDaysDto);
        }
    }
}