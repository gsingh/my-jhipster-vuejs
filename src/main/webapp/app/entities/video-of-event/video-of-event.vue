<template>
    <div>
        <h2 id="page-heading">
            <span id="video-of-event-heading">Video Of Events</span>
            <router-link :to="{name: 'VideoOfEventCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-video-of-event">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new VideoOfEvent
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <div class="row">
            <div class="col-sm-12">
                <form name="searchForm" class="form-inline" v-on:submit.prevent="search(currentSearch)">
                    <div class="input-group w-100 mt-3">
                        <input type="text" class="form-control" name="currentSearch" id="currentSearch"
                            
                            v-model="currentSearch" />
                        <button type="button" id="launch-search" class="btn btn-primary" v-on:click="search(currentSearch)">
                            <font-awesome-icon icon="search"></font-awesome-icon>
                        </button>
                        <button type="button" id="clear-search" class="btn btn-secondary" v-on:click="clear()"
                            v-if="currentSearch">
                            <font-awesome-icon icon="trash"></font-awesome-icon>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <br/>
        <div class="table-responsive" v-if="videoOfEvents">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span>ID</span></th>
                    <th><span>Video Date</span></th>
                    <th><span>Video File</span></th>
                    <th><span>Event PM</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="videoOfEvent in videoOfEvents"
                    :key="videoOfEvent.id">
                    <td>
                        <router-link :to="{name: 'VideoOfEventView', params: {videoOfEventId: videoOfEvent.id}}">{{videoOfEvent.id}}</router-link>
                    </td>
                    <td>{{videoOfEvent.videoDate}}</td>
                    <td>
                        <a v-if="videoOfEvent.videoFile" v-on:click="openFile(videoOfEvent.videoFileContentType, videoOfEvent.videoFile)">open</a>
                        <span v-if="videoOfEvent.videoFile">{{videoOfEvent.videoFileContentType}}, {{byteSize(videoOfEvent.videoFile)}}</span>
                    </td>
                    <td>
                        <div v-if="videoOfEvent.eventPM">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventPMId: videoOfEvent.eventPM.id}}">{{videoOfEvent.eventPM.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'VideoOfEventView', params: {videoOfEventId: videoOfEvent.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'VideoOfEventEdit', params: {videoOfEventId: videoOfEvent.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(videoOfEvent)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="platemillvuejsApp.videoOfEvent.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-videoOfEvent-heading" >Are you sure you want to delete this Video Of Event?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-videoOfEvent" v-on:click="removeVideoOfEvent()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./video-of-event.component.ts">
</script>
