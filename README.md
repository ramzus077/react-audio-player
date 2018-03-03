## Audio Player React/Redux
## Jet Ruby
Make an audioplayer using React/Redux.
- ● audioplayer should have the following functionality: play/pause, play next/previous, seek the track (choose specific timestamp of the song),adjust volume
- ● playlist is the list of the tracks, each list item has an artist name, a track name and duration https://sc-cdn.scaleengine.net/i/b200619b3c506314a9eef56775fe2641.png  - mockup for the page. Make a custom design, design choices (colors, fonts, positioning) are left to your discretion.
* Functional specs:
 - ● When user opens the page, he sees the list of tracks and a player in unplayed state.
 - ● When user clicks on the track, it turns into selected mode in the playlist and shows the elapsed time while playing
 - ● When user clicks on the track, player starts the playback and turns into the playing state, showing the progress
 - ● When user clicks on the currently playing track in the playlist OR on the pause in the player interface, the playback stops
 - ● When user clicks on the player's progress bar, the playback begins at the selected timestamp, the elapsed time in the playlist should be changed accordingly
 - ● When user clicks on the "play next" button, the next track in the playlist starts. If the track is the last in the playlist the first in the playlist starts. The same applies to the "play previous"
- ● When user clicks on the volume adjuster, the volume level changes accordingly
- ● When user searches in the input, the list is filtered to match the query. Make a simple search to match on the first 3 letters and more.

For audio samples use  http://sampleswap.org/  or any other service licensed under creative commons.
