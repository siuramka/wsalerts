using tts_api.Data.Models.DTO;

namespace tts_api.Data.Models
{
  //  model Voice
  //  {
  //      id Int @id @default(autoincrement())
  //name String @db.VarChar(255)
  //displayName String?  @db.VarChar(255)
  //selected Boolean @default(false)
  //provider Provider @relation(fields: [providerId], references: [id])
  //providerId Int
  //  }
    public class Voice
    {
        public Voice() { }
        public Voice(VoiceInsert voiceInsert)
        {
            this.ProviderId = voiceInsert.ProviderId;
            this.Name = voiceInsert.Name;
            this.DisplayName = voiceInsert.DisplayName;
            this.Selected = voiceInsert.Selected;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string? DisplayName { get; set; }
        public bool Selected { get; set; }
        public Provider Provider { get; set; }
        public int ProviderId { get; set; }
    }
}
