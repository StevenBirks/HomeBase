using System.Collections.Generic;
using Api.Models;

namespace Api.Queries
{
    public interface IAdventQueries
    {
        ICollection<AdventStatusDto> GetAdventStatuses(int year);
    }
}