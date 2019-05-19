<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillvuejsApp.videoOfEvent.home.createOrEditLabel">Create or edit a VideoOfEvent</h2>
                <div>
                    <div class="form-group" v-if="videoOfEvent.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="videoOfEvent.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="video-of-event-videoDate">Video Date</label>
                        <div class="input-group">
                            <input id="video-of-event-videoDate" type="date" class="form-control" name="videoDate"  :class="{'valid': !$v.videoOfEvent.videoDate.$invalid, 'invalid': $v.videoOfEvent.videoDate.$invalid }"
                            v-model="$v.videoOfEvent.videoDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="video-of-event-videoFile">Video File</label>
                        <div>
                            <div v-if="videoOfEvent.videoFile" class="form-text text-danger clearfix">
                                <a class="pull-left" v-on:click="openFile(videoOfEvent.videoFileContentType, videoOfEvent.videoFile)">open</a><br>
                                <span class="pull-left">{{videoOfEvent.videoFileContentType}}, {{byteSize(videoOfEvent.videoFile)}}</span>
                                <button type="button" v-on:click="videoOfEvent.videoFile=null;videoOfEvent.videoFileContentType=null;"
                                        class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_videoFile" id="file_videoFile" v-on:change="setFileData($event, videoOfEvent, 'videoFile', false)"/>
                        </div>
                        <input type="hidden" class="form-control" name="videoFile" id="video-of-event-videoFile"
                            :class="{'valid': !$v.videoOfEvent.videoFile.$invalid, 'invalid': $v.videoOfEvent.videoFile.$invalid }" v-model="$v.videoOfEvent.videoFile.$model"  required/>
                        <input type="hidden" class="form-control" name="videoFileContentType" id="video-of-event-videoFileContentType"
                            v-model="videoOfEvent.videoFileContentType" />
                        <div v-if="$v.videoOfEvent.videoFile.$anyDirty && $v.videoOfEvent.videoFile.$invalid">
                            <small class="form-text text-danger" v-if="!$v.videoOfEvent.videoFile.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="video-of-event-eventPM">Event PM</label>
                        <select class="form-control" id="video-of-event-eventPM" name="eventPM" v-model="videoOfEvent.eventPM" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="videoOfEvent.eventPM && eventOfPlateMillOption.id === videoOfEvent.eventPM.id ? videoOfEvent.eventPM : eventOfPlateMillOption" v-for="eventOfPlateMillOption in eventOfPlateMills" :key="eventOfPlateMillOption.id">{{eventOfPlateMillOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.videoOfEvent.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./video-of-event-update.component.ts">
</script>
