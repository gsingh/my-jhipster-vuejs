<template>
    <div>
        <h2 id="page-heading">
            <span id="picture-of-event-heading">Picture Of Events</span>
            <router-link :to="{name: 'PictureOfEventCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-picture-of-event">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span >
                    Create new PictureOfEvent
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
        <div class="table-responsive" v-if="pictureOfEvents">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span>ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('picDate')"><span>Pic Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('imgFile')"><span>Img File</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('eventPM.id')"><span>Event PM</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="pictureOfEvent of orderBy(pictureOfEvents, propOrder, reverse === true ? 1 : -1)"
                    :key="pictureOfEvent.id">
                    <td>
                        <router-link :to="{name: 'PictureOfEventView', params: {pictureOfEventId: pictureOfEvent.id}}">{{pictureOfEvent.id}}</router-link>
                    </td>
                    <td>{{pictureOfEvent.picDate}}</td>
                    <td>
                        <a v-if="pictureOfEvent.imgFile" v-on:click="openFile(pictureOfEvent.imgFileContentType, pictureOfEvent.imgFile)">
                            <img v-bind:src="'data:' + pictureOfEvent.imgFileContentType + ';base64,' + pictureOfEvent.imgFile" style="max-height: 30px;" alt="pictureOfEvent image"/>
                        </a>
                        <span v-if="pictureOfEvent.imgFile">{{pictureOfEvent.imgFileContentType}}, {{byteSize(pictureOfEvent.imgFile)}}</span>
                    </td>
                    <td>
                        <div v-if="pictureOfEvent.eventPM">
                            <router-link :to="{name: 'EventOfPlateMillView', params: {eventPMId: pictureOfEvent.eventPM.id}}">{{pictureOfEvent.eventPM.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'PictureOfEventView', params: {pictureOfEventId: pictureOfEvent.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline">View</span>
                            </router-link>
                            <router-link :to="{name: 'PictureOfEventEdit', params: {pictureOfEventId: pictureOfEvent.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(pictureOfEvent)"
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
            <span slot="modal-title"><span id="platemillvuejsApp.pictureOfEvent.delete.question">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-pictureOfEvent-heading" >Are you sure you want to delete this Picture Of Event?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-pictureOfEvent" v-on:click="removePictureOfEvent()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./picture-of-event.component.ts">
</script>
