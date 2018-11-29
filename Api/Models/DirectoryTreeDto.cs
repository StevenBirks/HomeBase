using System.Collections.Generic;

namespace Api.Models
{
    public class DirectoryTreeDto
    {
        public string Name { get; set; }
        public bool IsFile { get; set; }
        public List<DirectoryTreeDto> Children { get; set; }
    }
}