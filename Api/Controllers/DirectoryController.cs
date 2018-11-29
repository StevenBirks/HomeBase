using Microsoft.AspNetCore.Mvc;
using Api.Models;
using System.Collections.Generic;
using Api.Queries;
using System;
using System.IO;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class DirectoryController : Controller
    {
        public DirectoryController()
        {
        }

        [HttpGet("tree", Name = "GetDirectoryTreeData")]
        public IActionResult Get([FromQuery(Name = "sublocation")]string subLocation)
        {
            var directoryInfo = new DirectoryInfo(@"C:\Users\stevenb\Desktop");

            var directoryTreeDto = new List<DirectoryTreeDto>();

            if (directoryInfo.Exists)
            {
                BuildTree(directoryInfo, directoryTreeDto);
            }
 
  
            return Ok(directoryTreeDto);
        }

        private void BuildTree(DirectoryInfo directoryInfo, List<DirectoryTreeDto> addInMe)
        {
            var curNode = new DirectoryTreeDto() {
                Name = directoryInfo.Name, 
                IsFile = false,
                Children = new List<DirectoryTreeDto>()
            };

            addInMe.Add(curNode);

            foreach (FileInfo file in directoryInfo.GetFiles())
            {
                curNode.Children.Add(new DirectoryTreeDto() {
                    Name = file.Name,
                    IsFile = true,
                    Children = new List<DirectoryTreeDto>()
                });                 
            }

            foreach (DirectoryInfo subdir in directoryInfo.GetDirectories())
            {
                BuildTree(subdir, curNode.Children);
            }
        }
    }
}