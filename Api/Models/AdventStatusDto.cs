namespace Api.Models
{
    public class AdventStatusDto
    {
        public AdventDayDto AdventDay { get; set; }
        public bool StartedP1 { get; set; }
        public bool StartedP2 { get; set; }
        public bool CompletedP1 { get; set; }
        public bool CompletedP2 { get; set; }
    }
}