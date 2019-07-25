using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Api.Models;
using System.Collections.Generic;
using Api.Queries;
using System;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class AdventController : Controller
    {
         private readonly IAdventQueries _adventQueries;

        public AdventController(IAdventQueries adventQueries)
        {
             _adventQueries = adventQueries ?? throw new ArgumentNullException(nameof(adventQueries));
        }

        [HttpGet("advent-statuses", Name = "GetAdventStatuses")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<List<AdventStatusDto>> Get([FromQuery(Name = "year")]int year)
        {
            var adventDaysDto = _adventQueries.GetAdventStatuses(year);

            return Ok(adventDaysDto);
        }
    }
}