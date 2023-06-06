namespace tts_api.Data.Models
{
    public class Provider
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Voice> Voices { get; set;}
        public SelectedProvider SelectedProvider { get; set; } 
    }
}
