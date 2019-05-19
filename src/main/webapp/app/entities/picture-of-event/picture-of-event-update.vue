<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="platemillvuejsApp.pictureOfEvent.home.createOrEditLabel">Create or edit a PictureOfEvent</h2>
                <div>
                    <div class="form-group" v-if="pictureOfEvent.id">
                        <label for="id">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="pictureOfEvent.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="picture-of-event-picDate">Pic Date</label>
                        <div class="input-group">
                            <input id="picture-of-event-picDate" type="date" class="form-control" name="picDate"  :class="{'valid': !$v.pictureOfEvent.picDate.$invalid, 'invalid': $v.pictureOfEvent.picDate.$invalid }"
                            v-model="$v.pictureOfEvent.picDate.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="picture-of-event-imgFile">Img File</label>
                        <div>
                            <img v-bind:src="'data:' + pictureOfEvent.imgFileContentType + ';base64,' + pictureOfEvent.imgFile" style="max-height: 100px;" v-if="pictureOfEvent.imgFile" alt="pictureOfEvent image"/>
                            <div v-if="pictureOfEvent.imgFile" class="form-text text-danger clearfix">
                                <span class="pull-left">{{pictureOfEvent.imgFileContentType}}, {{byteSize(pictureOfEvent.imgFile)}}</span>
                                <button type="button" v-on:click="clearInputImage('imgFile', 'imgFileContentType', 'file_imgFile')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_imgFile" id="file_imgFile" v-on:change="setFileData($event, pictureOfEvent, 'imgFile', true)" accept="image/*"/>
                        </div>
                        <input type="hidden" class="form-control" name="imgFile" id="picture-of-event-imgFile"
                            :class="{'valid': !$v.pictureOfEvent.imgFile.$invalid, 'invalid': $v.pictureOfEvent.imgFile.$invalid }" v-model="$v.pictureOfEvent.imgFile.$model"  required/>
                        <input type="hidden" class="form-control" name="imgFileContentType" id="picture-of-event-imgFileContentType"
                            v-model="pictureOfEvent.imgFileContentType" />
                        <div v-if="$v.pictureOfEvent.imgFile.$anyDirty && $v.pictureOfEvent.imgFile.$invalid">
                            <small class="form-text text-danger" v-if="!$v.pictureOfEvent.imgFile.required">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label"  for="picture-of-event-eventPM">Event PM</label>
                        <select class="form-control" id="picture-of-event-eventPM" name="eventPM" v-model="pictureOfEvent.eventPM" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="pictureOfEvent.eventPM && eventOfPlateMillOption.id === pictureOfEvent.eventPM.id ? pictureOfEvent.eventPM : eventOfPlateMillOption" v-for="eventOfPlateMillOption in eventOfPlateMills" :key="eventOfPlateMillOption.id">{{eventOfPlateMillOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.pictureOfEvent.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./picture-of-event-update.component.ts">
</script>
