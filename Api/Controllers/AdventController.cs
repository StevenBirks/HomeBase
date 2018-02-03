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

            // abstract to query;

            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = true,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = year, Day = 11 }
            });
            adventDaysDto.Add(new AdventStatusDto
            {
                CompletedP1 = true,
                CompletedP2 = false,
                StartedP1 = true,
                StartedP2 = true,
                AdventDay = new AdventDayDto { Year = year, Day = 12 }
            });

            return Ok(adventDaysDto);
        }
    }
}